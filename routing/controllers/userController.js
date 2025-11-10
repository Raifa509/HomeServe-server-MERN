const services = require('../../models/serviceModel');
const users = require('../../models/userModel')

const jwt = require('jsonwebtoken')

//register
exports.registerController = async (req, res) => {
    console.log("Inside Register API");
    console.log(req.body);
    const { username, email, password } = req.body
    // console.log(username,email,password);
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(409).json("User Already exist!!! Please Login")
        } else {
            const newUser = new users({
                username,
                email,
                password
            })

            await newUser.save()
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json(err)
    }

}

//login

exports.loginController = async (req, res) => {
    console.log("Inside login controller");
    // console.log(req.body)
    const { email, password } = req.body
    // console.log(email, password);
    try {
        const existingUser = await users.findOne({ email })
        console.log(existingUser);

        if (existingUser) {
            if (existingUser.password == password) {
                const token = jwt.sign({ userMail: existingUser.email, role: existingUser.role }, process.env.JWTSECRET)
                res.status(200).json({ user: existingUser, token })
            } else {
                res.status(401).json("Invalid Credential")

            }
        } else {
            res.status(404).json("Account doesn't exist!!!")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

//googlelogin
exports.googleLoginController = async (req, res) => {
    console.log("Inside googlelogin controller");
    const { username, email, password, profile } = req.body
    // console.log(username,email,password,profile);
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const token = jwt.sign({ userMail: existingUser.email, role: existingUser.role }, process.env.JWTSECRET)
            res.status(200).json({ user: existingUser, token })
        } else {
            const newUser = new users({
                username, email, password, profile
            })
            await newUser.save()
            const token = jwt.sign({ userMail: newUser.email }, process.env.JWTSECRET)
            res.status(200).json({ user: newUser, token })
        }
    } catch (err) {
        console.log(err);

    }


}


//profile



// -------------------------admin--------------------------------

//admin profile update
exports.updateAdminProfileController = async (req, res) => {
    console.log("Inside updateAdminProfileController");
    const { username, password, bio, role } = req.body
    const email = req.payload
    const uploadedProfile = req.file ? req.file.filename : req.body.profile
    try {
        const uploadedAdminProfile = await users.findOneAndUpdate({ email }, { username, email, password, profile: uploadedProfile, bio, role }, { new: true })
        await uploadedAdminProfile.save()
        res.status(200).json(uploadedAdminProfile)
    } catch (err) {
        res.status(500).json(err)
    }

}

//get customer details
exports.getAllUsersAdminController = async (req, res) => {
    console.log("Inside getAllUsersAdminController");
    const email = req.payload
    const searchKey = req.query.search
    const query = {
        email: { $ne: email },
        $or: [
            { username: { $regex: searchKey, $options: 'i' } },
            { email: { $regex: searchKey, $options: 'i' } }
        ]
    }
    try {
        const allUsers = await users.find(query)
        res.status(200).json(allUsers)
    } catch (err) {
        res.status(500).json(err)
    }

}


//----------------------users-----------------------------------

//user -get services
exports.getAllServicesController=async(req,res)=>{
    console.log("Inside getAllServicesController");
    const searchKey=req.query.search
    
      const query = {
        name: { $regex: searchKey, $options: 'i' }
    }
    try{
        const allServices=await services.find(query)
        res.status(200).json(allServices)
    }catch(err)
    {
        res.status(500).json(err)
    }
    
}

//user-get service details
exports.getServiceDetailsController=async(req,res)=>{
    console.log("Inside getServiceDetailsController");
    const {id}=req.params
    try{
        const serviceDetails=await services.find({_id:id})
        res.status(200).json(serviceDetails)
    }catch(err)
    {
        res.status(500).json(err)
    }
}





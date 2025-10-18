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
                const token = jwt.sign({ userMail: existingUser.email }, process.env.JWTSECRET)
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





//profile








const applications = require('../../models/applicationModel')

//add application
exports.addApplicationController = async (req, res) => {
    console.log("Inside addApplicationControlller");
    const { fullname, email, phone, qualification, experience, status, jobTitle, jobId } = req.body
    const resume = req.file.filename
    try {
        const applicationDetails = await applications.findOne({ email, jobId })
        if (applicationDetails) {
            res.status(409).json("You have already applied")
        } else {
            const newApplication = new applications({
                fullname, email, phone, qualification, experience, resume, status, jobTitle, jobId
            })
            await newApplication.save()
            res.status(200).json(newApplication)
        }
    } catch (err) {
        res.status(500).json(err)
    }


}

//get application
exports.getApplicationController = async (req, res) => {
    console.log("Inside getApplicationController");
    try {
        const allApplication = await applications.find()
        res.status(200).json(allApplication)
    } catch (err) {
        res.status(500).json(err)
    }

}

//change status 
exports.updateApplicationStatusController = async (req, res) => {
    console.log("Inside updateApplicationStatusControlle");
    console.log("Body received:", req.body);
    const { id } = req.params
    const { status } = req.body
    console.log("Body received:", req.body);

    try {
        const updateApplication = await applications.findByIdAndUpdate({ _id: id }, { status }, { new: true })
        res.status(200).json(updateApplication)
    } catch (err) {
        console.log(err);

    }

}
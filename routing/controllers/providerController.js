const providers = require('../../models/providerModel')

//add provider 
exports.addProviderController = async (req, res) => {
    console.log("Inside addProviderController");
    const { name, email, phone, role, status } = req.body
    try {
        const existingProvider = await providers.findOne({ email })
        if (existingProvider) {
            res.status(409).json("Provider with this email already exists!")
        } else {
            const profile = req.file ? req.file.filename : ""
            const newProvider = new providers({
                name, email, phone, role, status, profile
            })
            await newProvider.save()
            res.status(200).json(newProvider)
        }

    } catch (err) {
        res.status(500).json(err)
    }

}

//get provider
exports.getProviderController = async (req, res) => {
    console.log("Inside getProviderController");
    const searchKey = req.query.search
    const query = {
        $or: [
            { name: { $regex: searchKey, $options: 'i' } },
            { role: { $regex: searchKey, $options: 'i' } }
        ]
    }
    try {
        const providerDetails = await providers.find(query)
        res.status(200).json(providerDetails)
    } catch (err) {
        res.status(500).json(err)
    }
}

//remove provider
exports.removeProviderController = async (req, res) => {
    console.log("Inside removeProviderController");
    const { id } = req.params
    try {
        const removeProvider = await providers.findByIdAndDelete({ _id: id })
        res.status(200).json(removeProvider)
    } catch (err) {
        res.status(500).json(err)
    }
}

//edit provider
exports.updateProviderController = async (req, res) => {
    console.log("Inside updateProviderController");
    const { name, email, phone, role, status, profile, joinedDate, leaveDate } = req.body
    const { id } = req.params
    const updatedProfile = req.file ? req.file.
        filename : profile

    let updatedLeaveDate = leaveDate
    if (status == "Inactive") {
        updatedLeaveDate = new Date()
    } else if (status == "Active") {
        updatedLeaveDate = null
    }

    try {
        const updatedProvider = await providers.findByIdAndUpdate({ _id: id }, { name, email, phone, role, status, profile: updatedProfile, joinedDate, leaveDate:updatedLeaveDate }, { new: true })
        res.status(200).json(updatedProvider)
    } catch (err) {
        res.status(500).json(err)
    }

}


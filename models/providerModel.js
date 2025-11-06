const mongoose = require('mongoose')

const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Active",
    },
    profile: {
        type: String,
        default: "",
    },
    joinedDate: { 
        type: Date, 
        default: Date.now 
    },
    leaveDate: { 
        type: Date, 
        default: null 
    },
})

const providers = mongoose.model("providers", providerSchema)
module.exports = providers
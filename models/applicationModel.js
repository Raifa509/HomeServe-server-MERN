const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        enum: ["Fresher", "1 Year", "2 Years", "3+ Years", "5+ Years"],
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
     jobTitle:{
        type:String,
        required:true
    },
    jobId:{
        type:String,
        required:true
    },
})

const applications=mongoose.model("applications",applicationSchema)
module.exports=applications
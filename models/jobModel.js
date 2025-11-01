const mongoose=require('mongoose')

const jobSchema=new mongoose.Schema({
    jobTitle:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        enum:["Full Time","Part Time","Internship","Contract"],
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:{
        type:[String],
        default:[]
    },
    status:{
        type:String,
        enum:["Active","Closed"],
        default:"Active"
    },
    postedDate:{
        type:Date,
        default:Date.now
    },
    closedDate:{
        type:Date,
        default:null,
    }


})

const jobs=mongoose.model("jobs",jobSchema)
module.exports=jobs
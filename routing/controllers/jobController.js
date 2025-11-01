const jobs=require('../../models/jobModel')

//add job
exports.addJobController=async(req,res)=>{
    console.log('Inside addJobController');
    const {jobTitle,jobType,location,description,requirements,status}=req.body
    try{
        const jobDetails=await jobs.findOne({jobTitle,location})
        if(jobDetails)
        {
            res.status(409).json("Job already exist!!!")
        }else{
            let formattedRequirements=requirements
            if(typeof requirements=="string")
            {
                formattedRequirements=requirements.split('.').map((r)=>r.trim()).filter((r)=>r.length>0)
            }
            const newJob=new jobs({
                jobTitle,jobType,location,description,requirements:formattedRequirements,status
            })
            await newJob.save()
            res.status(200).json(newJob)
        }
    }catch(err)
    {
        res.status(500).json(err)
        console.log(err);
        
    }
}

//get all jobs
exports.getAllJobController=async(req,res)=>{
    console.log("Inside getAllJobController");
    const searchKey=req.query.search
    const query={
        jobTitle:{$regex:searchKey,$options:"i"}
    }
    try{
        const allJobs=await jobs.find(query)
        res.status(200).json(allJobs)
    }catch(err)
    {
          res.status(500).json(err)
          console.log(err);
          
    }
    
}

//remove job
exports.removeJobController=async(req,res)=>{
    console.log("Inside removeJobController");
    const {id}=req.params
    try{
        const deleteJob=await jobs.findByIdAndDelete({_id:id})
        res.status(200).json(deleteJob)
    }catch(err){
        res.status(500).json(err)
    }
}

//close application
exports.closeJobController=async(req,res)=>{
    console.log("Inside closeJobController");
    const {id}=req.params
    try{
        const closeJob=await jobs.findByIdAndUpdate({_id:id},{status:"Closed"},{new:true})
        res.status(200).json(closeJob)
    }catch(err)
    {
        res.status(500).json(err)
    }
    
}


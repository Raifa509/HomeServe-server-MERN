const services = require('../../models/serviceModel');

//view all services

exports.viewAllAdminServices=async(req,res)=>{
    console.log("Inside viewAllServices");
    const searchKey=req.query.search
    const query={
        name:{$regex:searchKey,$options:'i'}
    }
    try{
        const allServices=await services.find(query)
        res.status(200).json(allServices)
    }catch(err){
        res.status(500).json(err)
    } 
}
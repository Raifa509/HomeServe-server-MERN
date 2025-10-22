const jwt=require('jsonwebtoken')

const adminMiddleware=(req,res,next)=>{
    console.log("Inside adminMiddleware");
    console.log(req.payload);
    
}
module.exports=adminMiddleware
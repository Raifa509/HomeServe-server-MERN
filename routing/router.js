const express=require("express")
const userController=require('./controllers/userController')
const serviceController=require('./controllers/serviceController')
const adminController=require('./controllers/adminController')
const jwtMiddleware=require("../middlewares/jwtMiddlewares")
const adminMiddleware=require("../middlewares/adminMiddlewares")
const multerConfig=require("../middlewares/imageMulterMiddleware")
const router=express.Router()

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//google login
router.post('/google-login',userController.googleLoginController)


//add service
router.post('/add-service',jwtMiddleware,multerConfig.fields([{name:'thumbnail',maxCount:1},{name:'detailImage',maxCount:1}]),serviceController.addServiceController)


//view service in admin
router.get('/admin/services',jwtMiddleware,adminController.viewAllAdminServices)

module.exports=router
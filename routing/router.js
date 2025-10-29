const express=require("express")
const userController=require('./controllers/userController')
const serviceController=require('./controllers/serviceController')
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


//------------------------------admin----------------------

//add service
router.post('/add-service',adminMiddleware,multerConfig.fields([{name:'thumbnail',maxCount:1},{name:'detailImage',maxCount:1}]),serviceController.addServiceController)


//view service in admin
router.get('/admin/services',adminMiddleware,serviceController.viewAllAdminServices)

//delete service in admin
router.delete('/admin/service/:id/delete',adminMiddleware,serviceController.deleteAdminService)


//update admin profile
router.put('/admin-profile/edit',adminMiddleware,multerConfig.single("profile"),userController.updateAdminProfileController)



module.exports=router
const express=require("express")
const userController=require('./controllers/userController')
const serviceController=require('./controllers/serviceController')
const jobController=require('./controllers/jobController')
const applicationController=require('./controllers/applicationController')
const bookingController=require('./controllers/bookingController')
const providerController=require('./controllers/providerController')
const dashboardControlller=require('./controllers/dashboardController')
const jwtMiddleware=require("../middlewares/jwtMiddlewares")
const adminMiddleware=require("../middlewares/adminMiddlewares")
const pdfMulterConfig=require("../middlewares/pdfMutterMiddleware")
const providerMulterConfig=require('../middlewares/providerImageMulterMiddleware')
const multerConfig=require("../middlewares/imageMulterMiddleware")
const router=express.Router()


// --------------------------guest user----------------------

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//google login
router.post('/google-login',userController.googleLoginController)

//get jobs
router.get("/all-jobs/openings",jobController.getAllJobUserController)

//get service in user
router.get('/all-services',userController.getAllServicesController)


//------------------------------admin-------------------------------------

//--> Dashboard
router.get('/dashboard',adminMiddleware,dashboardControlller.getDashboardStatsController)
router.get('/bookings-per-service', adminMiddleware, dashboardControlller.getBookingsPerServiceController);

//-->service -admin

//add service
router.post('/add-service',adminMiddleware,multerConfig.fields([{name:'thumbnail',maxCount:1},{name:'detailImage',maxCount:1}]),serviceController.addServiceController)

//view service in admin
router.get('/admin/services',adminMiddleware,serviceController.viewAllAdminServices)

//delete service in admin
router.delete('/admin/service/:id/delete',adminMiddleware,serviceController.deleteAdminService)

//update service in admin
router.put('/update-service/:id',adminMiddleware,serviceController.updateAdminServiceController)



//-->settings-admin

//update admin profile
router.put('/admin-profile/edit',adminMiddleware,multerConfig.single("profile"),userController.updateAdminProfileController)


//-->customers-admin

//get all users
router.get('/admin/all-users',adminMiddleware,userController.getAllUsersAdminController)

//-->careers-admin

//add job
router.post('/add-job',adminMiddleware,jobController.addJobController)

//get job
router.get('/all-jobs',adminMiddleware,jobController.getAllJobController)

//delete-job
router.delete('/remove/job/:id',adminMiddleware,jobController.removeJobController)

//close-job
router.put('/close-job/:id',adminMiddleware,jobController.closeJobController)

//view job applications
router.get('/job-application/view',adminMiddleware,applicationController.getApplicationController)

//job status update
router.put('/application/status/:id',adminMiddleware,applicationController.updateApplicationStatusController)

//-->service providers-admin

//add - service provider
router.post('/add-provider',adminMiddleware,providerMulterConfig.single("profile"),providerController.addProviderController)

//get -service provider
router.get('/all-provider',adminMiddleware,providerController.getProviderController)

//remove-service provider
router.delete('/remove/provider/:id',adminMiddleware,providerController.removeProviderController)

//edit-service provider
router.put('/update/provider/:id',adminMiddleware,providerMulterConfig.single("profile"),providerController.updateProviderController)


//-->bookings -admin

//get all bookings
router.get('/all-bookings',adminMiddleware,bookingController.getBookingsController)

//get provider for booking
router.get('/booking-provider',adminMiddleware,bookingController.getBookingProvidersController)

//assign provider for booking
router.put('/:id/assign-provider',adminMiddleware,bookingController.assignProviderController)

//delete-booking
router.delete('/remove/booking/:id',adminMiddleware,bookingController.removeBookingController)

//booking status update
router.put('/booking/status/:id',adminMiddleware,bookingController.updateBookingStatus)


//---------------------------------authorized user-------------------------------------------


//apply job
router.post('/apply-job',jwtMiddleware,pdfMulterConfig.single("resume"),applicationController.addApplicationController)

//get service details
router.get('/service/:id/details',jwtMiddleware,userController.getServiceDetailsController)

//get services for booking
router.get('/services',bookingController.getAllServiceCategoryController)

//submit bookings
router.post('/make-bookings',jwtMiddleware,bookingController.addBookingsController)













module.exports=router
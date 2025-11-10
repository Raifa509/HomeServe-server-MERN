const services = require('../../models/serviceModel')
const bookings = require('../../models/bookingModel')
const providers = require('../../models/providerModel')


//get services 
exports.getAllServiceCategoryController = async (req, res) => {
    console.log("Inside getAllServiceCategoryController");
    try {
        const categoryDetails = await services.find()
        res.status(200).json(categoryDetails)
    } catch (err) {
        res.status(500).json(err)
    }
}

//add bookings
exports.addBookingsController = async (req, res) => {
    console.log("Inside addBookingsController");
    const { customerName, serviceName, fullName, phone, date, address, additionalNotes, isEmergency } = req.body
    try {
        const newBooking = new bookings({
            customerName, serviceName, fullName, phone,
            date: date || null
            , address,
            additionalNotes: additionalNotes || "",
            isEmergency: !!isEmergency
        })
        await newBooking.save()
        res.status(200).json(newBooking)
    } catch (err) {
        res.status(500).json(err)
    }
}

//get all bookings
exports.getBookingsController = async (req, res) => {
    const searchKey = req.query.search
    const query = {
        $or: [
            { serviceName: { $regex: searchKey, $options: 'i' } },
            { customerName: { $regex: searchKey, $options: 'i' } }
        ]
    }
    try {
        const allbookings = await bookings.find(query).sort({ date: 1 })
        res.status(200).json(allbookings)
    } catch (err) {
        res.status(500).json(err)
    }
}

//get all service providers
exports.getBookingProvidersController = async (req, res) => {
    console.log("Inside getBookingProvidersController");
    try {
        const providerDetails = await providers.find()
        res.status(200).json(providerDetails)
    } catch (err) {
        res.status(500).json(err)
    }

}

//assign provider to booking
exports.assignProviderController=async(req,res)=>{
    console.log("Inside assignProviderController");
    const {id}=req.params
    const {providerName}=req.body
    try{
        const provider=await providers.findOne({name:providerName})
        const assign=await bookings.findByIdAndUpdate({_id:id},{assignedProvider:provider.name,providerRole:provider.role},{new:true})
        res.status(200).json(assign)
    }catch(err)
    {
        res.status(500).json(err)
    }
    
}
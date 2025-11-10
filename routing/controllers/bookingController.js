const services = require('../../models/serviceModel')
const bookings = require('../../models/bookingModel')

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
    const { customerName, serviceName, fullName, phone, date, address, additionalNotes,isEmergency } = req.body
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
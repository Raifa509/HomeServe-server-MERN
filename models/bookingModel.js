const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    fullName: { 
        type: String, 
        required: true 
    },
    serviceName: {
        type: String,
        required: true
    },

    isEmergency: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    },
    address: {
        type: String,
        required: true
    },
    additionalNotes: {
        type: String
    },
    status: {
        type: String,
        default: "Pending"
    },
    assignedProvider:{
        type:String,
    },
    providerRole:{
        type:String
    }
})
const bookings = mongoose.model("bookings", bookingSchema)
module.exports = bookings
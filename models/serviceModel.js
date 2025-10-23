const mongoose = require('mongoose');

// Schema creation
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: 'No Description provided'
    },
    about: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        enum: ['Cleaning', 'Outdoor & Gardening', 'Repairs', 'Painting', 'Installation', 'Moving', 'Emergency'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: String,
        default: ''
    },
    thumbnail: {
        type: String,
        default: '',
    },
    detailImage: {
        type: String,
        default: '',
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    whatsIncluded: {
        type: [String],
        default: []
    },
    pricingTiers: [
        {
            name: String,
            price: Number
        }
    ],


});

const services = mongoose.model('services', serviceSchema);
module.exports = services;

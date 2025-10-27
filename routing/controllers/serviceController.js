const services = require('../../models/serviceModel');

exports.addServiceController = async (req, res) => {
    console.log("inside addServiceController");

    try {
        const { name, description, about, category, price, duration, rating, whatsIncluded, pricingTiers, isEmergency, subCategory } = req.body;

        const thumbnail = req.files?.thumbnail?.[0]?.filename || '';
        const detailImage = req.files?.detailImage?.[0]?.filename || '';

        // Check for existing service
        const existingService = await services.findOne({ name: name.trim() });
        if (existingService) {
            return res.status(401).json("Service with this name already exists");
        }

        // Parse arrays safely
        const whatsIncludedArray = whatsIncluded ? JSON.parse(whatsIncluded) : [];
        const pricingTiersArray = pricingTiers ? JSON.parse(pricingTiers) : [];

        const newService = new services({
            name: name.trim(),
            description: description || 'No Description provided',
            about: about || '',
            category,
            price: Number(price),
            duration: duration || '',
            thumbnail,
            detailImage,
            rating: Number(rating) || 0,
            whatsIncluded: whatsIncludedArray,
            pricingTiers: pricingTiersArray,
            isEmergency: isEmergency === "true" || isEmergency === true,
            subCategory: subCategory || "",
        });

        await newService.save();
        res.status(200).json(newService);

    } catch (err) {
        console.error("Error in addServiceController:", err);
        res.status(500).json({ error: err.message });
    }
};

//view all services

exports.viewAllAdminServices = async (req, res) => {
    console.log("Inside viewAllServices");
    const searchKey = req.query.search
    const query = {
        name: { $regex: searchKey, $options: 'i' }
    }
    try {
        const allServices = await services.find(query)
        res.status(200).json(allServices)
    } catch (err) {
        res.status(500).json(err)
    }
}

//delete service
exports.deleteAdminService = async (req, res) => {
    console.log("Inside deleteAdminService");
    const { id } = req.params
    console.log(id);
    try {
        await services.findByIdAndDelete({ _id: id })
        // res.status(200).json("Deleted Successfully!!!")

    } catch (err) {
        res.status(500).json(err)
    }


}
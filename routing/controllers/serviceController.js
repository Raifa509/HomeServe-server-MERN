const services = require('../../models/serviceModel');

exports.addServiceController = async (req, res) => {
    console.log("inside addServiceController");

    try {
        const { name, description, about, category, price, duration, rating, whatsIncluded, pricingTiers } = req.body;

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
            pricingTiers: pricingTiersArray
        });

        await newService.save();
        res.status(200).json(newService);

    } catch (err) {
        console.error("Error in addServiceController:", err);
        res.status(500).json({ error: err.message });
    }
};

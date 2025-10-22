const services = require('../../models/serviceModel')

//add service
exports.addServiceController = async (req, res) => {
    console.log("inside addServiceController");
    // console.log(req.body);
    const { name, description, about, category, price, duration, rating, whatsIncluded, pricingTiers } = req.body
    // console.log(req.files);

    const thumbnail = req.files?.thumbnail?.[0];
    const detailImage = req.files?.detailImage?.[0];
    const thumbnailFilename = thumbnail.filename
    const detailImageFilename = detailImage.filename
    // console.log(thumbnailFilename);

    // console.log(name,description,about,category,price,duration,rating,whatsIncluded,pricingTiers,thumbnail,detailImage);

    try {
        const existingService = await services.findOne({ name: name.trim() })
        if (existingService) {
            res.status(401).json("Service with this name already exists");
        } else {
            const newService = new services({
                name, description, about, category,price,duration,
                thumbnail: thumbnailFilename,
                detailImage: detailImageFilename,
                rating,
                whatsIncluded: whatsIncluded ? JSON.parse(whatsIncluded) : [],
                pricingTiers: pricingTiers ? JSON.parse(pricingTiers) : []
            })
            await newService.save()
            res.status(200).json(newService)
        }
    } catch (err) {
        res.status(500).json(err)
    }

}
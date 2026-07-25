const joi = require('joi');

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        price: joi.number().required().min(0),
        description: joi.string().required(),
        country: joi.string().required(),
        location: joi.string().required(),
        image: joi.object({ url: joi.string().allow("", null), filename: joi.string().allow("", null) }).allow(null)
    }).required()
});



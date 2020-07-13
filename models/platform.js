const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
});

const Platform = mongoose.model('Platform', platformSchema);

const validatePlatform = (platform) => {
    console.log(platform)
    const schema = {
        username: Joi.string().alphanum().min(5).max(30).required(),
        contact: Joi.string().regex(/^\d{3}\d{3}\d{4}$/).required()
    };

    return Joi.validate(platform, schema);
}

exports.platformSchema = platformSchema;
exports.Platform = Platform;
exports.validate = validatePlatform;
var mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    confirm_password: {
        type: String,
        require: true
    }
});
const User = mongoose.model('User', UserSchema);

const validateUser = (user) => {
    console.log(user)
    const schema = {
        name: Joi.string().alphanum().min(5).max(30).required(),
        password: Joi.string().min(5).max(30).required(),
        confirm_password: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
    };

    return Joi.validate(user, schema);
}


exports.validate = validateUser;
exports.UserSchema = UserSchema;
exports.User = User;

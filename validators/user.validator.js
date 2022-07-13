const joi = require('joi');

const validator = require('./common.validator');

module.exports = {
    newUserValidator: joi.object({
        name: validator.name.required(),
        age: validator.age.required(),
        password: validator.password.required(),
        email: validator.email.required(),
        phone: validator.phone.required(),
    }),
    userValidatorForUpdate: joi.object({
        name: validator.name,
        age: validator.age,
        avatar: validator.avatar
    }),
}
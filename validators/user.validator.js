const joi = require('joi');

const validator = require('./common.validator');

module.exports = {
    userValidatorForCreate: joi.object({
        name: validator.name.required(),
        age: validator.age.required(),
        password: validator.password.required(),
        email: validator.email.required(),
    }),
    userValidatorForUpdate: joi.object({
        name: validator.name,
        age: validator.age,
    }),
}
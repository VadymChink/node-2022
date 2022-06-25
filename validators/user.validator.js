const joi = require('joi');
const userValidator = require("./common.validator");

module.exports = {
    isValidBodyForCreate: joi.object({
        name: userValidator.name.required(),
        age: userValidator.age.required(),
        password: userValidator.password.required(),
        email: userValidator.email.required(),
    }),
    isValidBodyForUpdate: joi.object({
        name: userValidator.name,
        age: userValidator.age,
    })
}
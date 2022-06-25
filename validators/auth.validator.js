const joi = require("joi");
const userValidator = require("./common.validator");

module.exports = {
    isValidBodyForLogin: joi.object({
        email: userValidator.email.required(),
        password: userValidator.password.required(),
    })
}
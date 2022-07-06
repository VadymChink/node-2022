const joi = require('joi');

const validator = require('./common.validator');

module.exports = {
    loginValidator: joi.object({
        email: validator.email.required(),
        password:validator.password.required(),
    }),
    passwordValidator: joi.object({
        password:validator.password.required(),
    }),
}
const joi = require('joi');

const validator = require('./common.validator');

module.exports = {
    isValidBodyForLogin: joi.object({
        email: validator.email.required(),
        password: validator.password.required(),
    })
}
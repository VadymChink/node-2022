const joi = require('joi');

const {emailValidator, passwordValidator} = require("./common.validator");

module.exports = {
    login: joi.object({
        email: emailValidator.required(),
        password: passwordValidator.required(),
    })

}
const joi = require('joi');
const {nameValidator, ageValidator, emailValidator, passwordValidator} = require("./common.validator");

module.exports = {
    createUserValidator: joi.object({
        name: nameValidator.required(),
        age: ageValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
    }),
    updateUserValidator: joi.object({
        name: nameValidator,
        age: ageValidator,
    })
}
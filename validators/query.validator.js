const Joi = require('joi');

const {ageValidator, emailValidator, nameValidator} = require("./common.validator");

module.exports = {
    findAll: Joi.object({
        name: nameValidator,
        email: emailValidator,
        age: ageValidator
    })
}
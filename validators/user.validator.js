const Joi = require("joi");

const {constants} = require('../constants');

const userSubSchema = {
    name: Joi.string().alphanum().min(2).max(100).required(),
    age: Joi.number().integer().min(18).max(130),
}

module.exports = {
    newUserValidator: Joi.object({
        ...userSubSchema,
        email: Joi.string().regex(constants.EMAIL_REGEX).lowercase().required(),
        password: Joi.string().regex(constants.PASSWORD_REGEX).required()
    }),
    updateUserValidator: Joi.object({...userSubSchema,  name: Joi.string().alphanum().min(2).max(100) })
}
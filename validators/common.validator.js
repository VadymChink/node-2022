const joi = require('joi');
const {constants} = require("../constants");

module.exports = {
    name: joi.string().alphanum().min(3).max(100).trim(),
    age: joi.number().min(18).max(130).integer(),
    password: joi.string().regex(constants.PASSWORD_REGEX),
    email: joi.string().regex(constants.EMAIL_REGEX).trim().lowercase(),
    avatar: joi.string(),
    phone: joi.string().regex(constants.PHONE_REGEX).trim(),
}
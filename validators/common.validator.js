const joi = require('joi');
const {constants} = require("../constants");

module.exports = {
    name: joi.string().alphanum().trim().min(2).max(100),
    age: joi.number().integer().min(18).max(121),
    password: joi.string().regex(constants.PASSWORD_REGEX),
    email: joi.string().regex(constants.EMAIL_REGEX).lowercase().trim(),
}
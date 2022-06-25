const joi = require('joi');

const {constants} = require('../constants');

module.exports = {
    name: joi.string().alphanum().min(2).max(100).trim(),
    age: joi.number().integer().min(18).max(130),
    email: joi.string().regex(constants.EMAIL_REGEX).trim().lowercase(),
    password: joi.string().regex(constants.PASSWORD_REGEX),
}
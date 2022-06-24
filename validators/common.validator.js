const joi = require('joi');
const {constants} = require('../constants');

module.exports = {
    nameValidator: joi.string().trim().min(2).max(50).alphanum(),
    ageValidator: joi.number().integer().min(18).max(130),
    emailValidator: joi.string().trim().lowercase().regex(constants.EMAIL_REGEX),
    passwordValidator: joi.string().regex(constants.PASSWORD_REGEX).required(),
}
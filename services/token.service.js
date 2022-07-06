const jwt = require('jsonwebtoken');

const {config} = require("../constants");
const {ACCESS_TOKEN_ENUM, REFRESH_TOKEN_ENUM} = require("../enums/token.enum");
const {CError} = require("../errors");
const {FORGOT_PASSWORD} = require("../constants/email-action.enum");

module.exports = {
    generateTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        }
    },
    generateActionTokens: (actionType = '', payload = {}) => {
        let secretWord = '';
        let expiresIn = '7d'

        switch (actionType) {
            case FORGOT_PASSWORD:
                secretWord = config.FORGOT_PASS_ACTION_SECRET;
                break;

            default:
                throw new CError('wrong action type', 500)

        }

        return jwt.sign(payload, secretWord, {expiresIn})

    },
    checkActionTokens: (token, actionType = '') => {
        let secretWord = '';

        switch (actionType) {
            case FORGOT_PASSWORD:
                secretWord = config.FORGOT_PASS_ACTION_SECRET;
                break;

            default:
                throw new CError('wrong action type', 500)

        }

        return jwt.verify(token, secretWord);

    },
    checkToken: (token, tokenType = ACCESS_TOKEN_ENUM) => {

        let secret;

        if (tokenType === ACCESS_TOKEN_ENUM) secret = config.ACCESS_TOKEN_SECRET;
        if (tokenType === REFRESH_TOKEN_ENUM) secret = config.REFRESH_TOKEN_SECRET;

        return jwt.verify(token, secret);
    },

}
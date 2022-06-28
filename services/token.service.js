const jwt = require('jsonwebtoken');
const {config} = require("../constants");
const {ACCESS_TOKEN_ENUM, REFRESH_TOKEN_ENUM} = require("../enums/token.enum");

module.exports = {
    generateTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        }
    },
    checkToken: (token, tokenType = ACCESS_TOKEN_ENUM) => {

        let secret;

        if (tokenType === ACCESS_TOKEN_ENUM) secret = config.ACCESS_TOKEN_SECRET;
        if (tokenType === REFRESH_TOKEN_ENUM) secret = config.REFRESH_TOKEN_SECRET;

       return  jwt.verify(token, secret);
    },

}
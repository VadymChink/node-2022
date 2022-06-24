const jsonwebtoken = require('jsonwebtoken');
const {configs} = require("../constants");
const {CError} = require("../errors");

module.exports = {
    generateTokens: (payload = {}) => {
        const access_token = jsonwebtoken.sign(payload, configs.ACCEPT_TOKEN_SECRET, {expiresIn: '15m'});
        const refresh_token = jsonwebtoken.sign(payload, configs.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})

        return {
            access_token,
            refresh_token,
        }
    },
    checkToken: (token = '', tokenType = 'access') => {
        try {
            let secret;

            if (tokenType === 'access') secret =configs.ACCEPT_TOKEN_SECRET;
            if (tokenType === 'refresh') secret =configs.REFRESH_TOKEN_SECRET;

            return jsonwebtoken.verify(token, secret)
        } catch (e) {
            throw new CError('Token not valid', 401)
        }
    },

}
const jwt = require('jsonwebtoken');
const {CError} = require("../errors");
const {config} = require("../constants");

module.exports = {
    generateAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
        return {
            access_token,
            refresh_token,
        }
    },
    checkAccessToken: (token = '') => {
        try {
            return jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        } catch (e) {
            throw new CError('Token not valid', 401)
        }
    },
}
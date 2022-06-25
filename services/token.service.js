const jwt = require('jsonwebtoken');
const {configs} = require("../constants");
const {CError} = require("../errors");
const {tokenTypeEnum} = require("../enams");

module.exports = {
    generateAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, configs.ACCESS_TOKEN, {expiresIn: '15m'});
        const refresh_token = jwt.sign(payload, configs.REFRESH_TOKEN, {expiresIn: '30d'})

        return {
            access_token,
            refresh_token
        }
    },
    checksTokens: (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secret;

            if (tokenType === tokenTypeEnum.ACCESS)secret = configs.ACCESS_TOKEN;
            if (tokenType === tokenTypeEnum.REFRESH)secret = configs.REFRESH_TOKEN;

            return jwt.verify(token, secret)
        } catch (e) {
            throw new CError('Token not valid', 401)
        }
    },
}
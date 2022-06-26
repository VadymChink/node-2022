const jwt = require('jsonwebtoken');
const {config} = require("../constants");
const {tokenEnum} = require("../enums");
const {CError} = require("../errors");


module.exports = {
    generateTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        }
    },
    checkToken: (token, tokenType = tokenEnum.ACCESS_TOKEN) => {
        try {
            let secret;

            if (tokenType === tokenEnum.ACCESS_TOKEN)secret = config.ACCESS_TOKEN_SECRET;
            if (tokenType === tokenEnum.REFRESH_TOKEN)secret = config.REFRESH_TOKEN_SECRET;

            return  jwt.verify(token,secret);


        } catch (e) {
            throw new CError('Token not valid');
        }
    },
}
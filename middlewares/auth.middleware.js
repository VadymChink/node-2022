const {CError} = require("../errors");
const {tokenService} = require("../services");
const {OAuth} = require("../dataBase");

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            if (!access_token) {
                return next(new CError('No token', 401));
            }

            tokenService.checkAccessToken(access_token);

            const tokenInfo = await OAuth.findOne({access_token}).populate('userId');

            if (!tokenInfo) {
                return next(new CError('Token not valid', 401))
            }

            next();
        } catch (e) {
            next(e);
        }
    },
}
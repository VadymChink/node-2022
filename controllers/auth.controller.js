const {passwordService, tokenService} = require("../services");
const {OAuth} = require("../db");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id} = req.user;
            const {password} = req.body;

            await passwordService.comparePassword(hashPassword, password);

            const tokens = tokenService.generateTokens();

            const user = await OAuth.create({userId: _id, ...tokens});

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const {userId,refresh_token} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token});

            const tokens = tokenService.generateTokens();

            await OAuth.create({userId, ...tokens});

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },
}
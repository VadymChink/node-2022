const {OAuth} = require("../dataBase");
const {passwordService, tokenService} = require("../services");
const {userPresenter} = require("../presenters/user.presenter");
const {generateTokens} = require("../services/token.service");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id} = req.user;
            const {password} = req.body;

            await passwordService.comparePassword(hashPassword, password);

            const tokens = tokenService.generateTokens();

            await OAuth.create({
                userId: _id,
                ...tokens
            })

            const userForRes = userPresenter(req.user);
            res.json({
                user: userForRes,
                ...tokens
            });
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const {userId, refresh_token} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token});

            const token = generateTokens();

            await OAuth.create({userId, ...token});

            res.json(token);
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const {access_token} = req;

            await OAuth.deleteOne({access_token});

            res.sendStatus(204)
        } catch (e) {
            next(e);
        }
    },
}
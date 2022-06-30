const {passwordService, tokenService, emailService} = require("../services");
const {OAuth} = require("../db");
const {WELCOME} = require("../constants/email-action.enum");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id, email, name} = req.user;
            const {password} = req.body;

            await emailService.sendMail('vinnichuk.vadym.developer@gmail.com', WELCOME, {userName: name});
            // await emailService.sendMail(email, WELCOME);

            await passwordService.comparePassword(hashPassword, password);

            const tokens = tokenService.generateTokens();

            await OAuth.create({userId: _id, ...tokens});

            res.json({
                user: req.user,
                ...tokens
            });
        } catch (e) {
            next(e)
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const {refresh_token, userId} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token});

            const tokens = tokenService.generateTokens();

            await OAuth.create({userId, ...tokens});

            res.json(tokens)
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const {access_token} = req.tokenInfo;

            await OAuth.deleteOne({access_token});

            res.sendStatus(204);

        } catch (e) {
            next(e);
        }
    },
    logoutAllDevice: async (req, res, next) => {
        try {
            const {_id} = req.user;

            await OAuth.deleteMany({userId: _id});

            res.sendStatus(204);

        } catch (e) {
            next(e);
        }
    },
}
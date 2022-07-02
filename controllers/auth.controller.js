const {passwordService, tokenService, emailService} = require("../services");
const {OAuth} = require("../db");
const {WELCOME} = require("../constants/email-actions.enums");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id, email, name} = req.user;
            const {password} = req.body;

            await passwordService.comparePassword(hashPassword, password);

            await emailService.sendMail(email, WELCOME, {userName: name});

            const tokens = tokenService.generateTokens();

            await OAuth.create({userId: _id, ...tokens});

            res.json({
                user: req.user,
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

            const tokens = tokenService.generateTokens();

            await OAuth.create({userId, ...tokens});

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },
}
const {WELCOME, FORGOT_PASSWORD} = require("../constants/email-action.enum");
const {OAuth, ActionTokens, User} = require("../db");
const {passwordService, tokenService, emailService} = require("../services");
const {CError} = require("../errors");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id, email, name} = req.user;
            const {password} = req.body;

            await emailService.sendMail(email, WELCOME, {userName: name});

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
    forgotPassword: async (req, res, next) => {
        try {
            const {email, name, _id} = req.user;

            const token = tokenService.generateActionToken(FORGOT_PASSWORD, {name, _id});

            if (!token) {
                return next(new CError('No token', 401));
            }

            await ActionTokens.create({
                userId: _id,
                token,
                actionType: FORGOT_PASSWORD
            })

            await emailService.sendMail(email, FORGOT_PASSWORD, {userName: name, token});

            res.json('ok')
        } catch (e) {
            next(e);
        }
    },
    setForgotPassword: async (req, res, next) => {
        try {
            const {_id} = req.user;
            const {password} = req.body;

            const hashPassword =await passwordService.hashPassword(password);
            const updatedUser = await User.findByIdAndUpdate(_id, {password: hashPassword}, {new: true});

            await ActionTokens.deleteOne({actionType: FORGOT_PASSWORD, userId: _id});

            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

}
const {constants} = require("../constants");
const {OAuth, ActionTokens} = require('../db');
const {REFRESH_TOKEN_ENUM} = require("../enums/token.enum");
const {CError} = require("../errors");
const {tokenService, userService} = require("../services");
const {authValidator} = require("../validators");

module.exports = {
    isBodyValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.loginValidator.validate(req.body);

            if (error) {
                return next(new CError(error.details[0].message))
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
    isPasswordValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.passwordValidator.validate(req.body);

            if (error) {
                return next(new CError(error.details[0].message))
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserPresent: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findUser({email});

            if (!user) {
                return next(new CError('Wrong email or password'))
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                return next(new CError('No token', 401));
            }

            tokenService.checkToken(refresh_token, REFRESH_TOKEN_ENUM);

            const tokenInfo = await OAuth.findOne({refresh_token});

            if (!tokenInfo) {
                return next(new CError('Token not valid', 401));
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                return next(new CError('No token', 401));
            }

            const tokenInfo = await OAuth.findOne({access_token}).populate('userId');

            if (!tokenInfo) {
                return next(new CError('Token not valid', 401));
            }

            req.tokenInfo = tokenInfo;
            req.user = tokenInfo.userId;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkActionToken: (actionType) => async (req, res, next) => {
        try {
            const action_token = req.get(constants.AUTHORIZATION);

            if (!action_token) {
                return next(new CError('No token', 401));
            }

            tokenService.checkActionTokens(action_token, actionType);

            const tokenInfo = await ActionTokens.findOne({token: action_token}).populate('userId');

            if (!tokenInfo) {
                return next(new CError('Token not valid', 401));
            }

            req.user = tokenInfo.userId;

            next();
        } catch (e) {
            next(e);
        }
    },
}
const {tokenService, passwordService, emailService} = require('../services');
const {userPresenter} = require("../presenters/user.presenter");
const {OAuth} = require("../dataBase");
const {WELCOME} = require("../constants/email-actions.enums");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id, email, name} = req.user;
            const {password} = req.body;

            await passwordService.comparePassword(hashPassword, password);

            await emailService.sendEmail(email,WELCOME,{name});
            const tokens = tokenService.generateAuthTokens();

            await OAuth.create({
                userId: _id,
                ...tokens,
            })

            const userForRes = userPresenter(req.user);

            res.json({
                user: userForRes,
                ...tokens
            })

        } catch (e) {
            next(e)
        }
    },
}
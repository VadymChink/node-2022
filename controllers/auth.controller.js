const {tokenService, passwordService} = require('../services');
const {userPresenter} = require("../presenters/user.presenter");
const {OAuth} = require("../dataBase");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id} = req.user;
            const {password} = req.body;

            await passwordService.comparePassword(hashPassword, password);

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
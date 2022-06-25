const {userService, passwordService} = require("../services");
const {userPresenter} = require("../presenters/user.presenter");

module.exports = {
    findAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllUsers().exec();

            const usersForRes = users.map(value => userPresenter(value));

            res.json(usersForRes);
        } catch (e) {
            next(e);
        }
    },
    findOneUser: async (req, res, next) => {
        try {
            const {user} = req;

            const userForRes = userPresenter(user);

            res.json(userForRes);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const {password} = req.body;

            const hashPassword = await passwordService.hashPassword(password);

            const user = await userService.createUsers({...req.body, password: hashPassword});

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },
}
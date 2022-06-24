const {userService, passwordService} = require("../services");
const {userPresenter} = require("../presenters/user.presenter");
module.exports = {
    findAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllUsers();

            res.json(users);
        } catch (e) {
            next(e)
        }
    },
    createUser: async (req, res, next) => {
        try {
            const {password} = req.body;
            const hashPassword = await passwordService.hashPassword(password);
            req.body = {...req.body, password: hashPassword}
            const user = await userService.createUser(req.body);
            const userForResponse = userPresenter(user);

            res.status(201).json(userForResponse);
        } catch (e) {
            next(e)
        }
    },
    findOneUser: async (req, res, next) => {
        try {
            const {user} = req;

            const userForResponse = userPresenter(user);

            res.json(userForResponse);
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res,next) => {
        try {
            const {userId} = req.params;
            await userService.deleteOne({_id: userId})

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const updatedUser = await userService.updateUser({_id:userId},req.body);

            const userForRes = userPresenter(updatedUser);

            res.status(201).json(userForRes)
        }catch (e) {
            next(e);
        }
    },
}
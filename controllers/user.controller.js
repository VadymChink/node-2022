const {userService} = require('../services');
const {User} = require('../db');

module.exports = {
    findUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllUsers();

            res.json(users);
        } catch (e) {
            next(e)
        }
    },
    createUser: async (req, res, next) => {
        try {
            const user = req.body;
            const newUser = await userService.createUser(user);

            res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    },
    findUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await userService.findUser({_id: userId});

            res.json(user)
        } catch (e) {
            next(e)
        }
    },
    deleteById: async (req, res, next) => {
        try {

            const {userId} = req.params;

            await userService.deleteUser({_id: userId});

            res.sendStatus(204);
        } catch (e) {
            next(e.message)
        }
    },
    updateById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const updatedUser = await userService.updateUser({_id: userId}, req.body);

            res.status(201).json(updatedUser);

        } catch (e) {
            next(e.message)
        }
    },
}
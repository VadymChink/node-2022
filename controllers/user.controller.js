const {userService} = require("../services");

module.exports = {
    findAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const newUser = await userService.createUser(req.body);

            res.status(201).json(newUser);

        } catch (e) {
            next(e);
        }
    },
    findOneUser: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.findOneUser({_id: userId});

            res.json(user);

        } catch (e) {
            next(e);
        }
    },
    deleteById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await userService.deleteById({_id: userId})

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
    updateById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const {user} = req;

            const updatedUser = await userService.updateById({_id: userId}, user);
            const {_id, name, email, age, createdAt, updatedAt} = updatedUser;

            res.status(201).json({_id, name, email, age, createdAt, updatedAt})
        } catch (e) {
            next(e);
        }
    },
}
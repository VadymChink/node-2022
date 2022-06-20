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
    findOneUser: async (req, res, next) => {
        try {
            const {user} = req;

            res.json(user);

        } catch (e) {
            next(e);
        }
    },
    createUsers: async (req, res, next) => {
        try {
            const newUser = await userService.createUsers(req.body);

            res.status(201).json(newUser)
        } catch (e) {
            next(e);
        }
    },
    updateById: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const {updatedUser} = req;

            const user = await userService.updateById({_id: userId}, updatedUser);

            res.status(201).json(user)
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

}
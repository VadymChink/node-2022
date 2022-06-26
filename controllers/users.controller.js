const {userService, passwordService} = require("../services");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllUsers();

            res.json(users)
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

            res.status(201).json(user);
        } catch (e) {
            next(e)
        }
    },

    // getById: async (req, res,next) => {
    //     try {
    //         const {userId} = req.params;
    //
    //         const user = await User.findOne({_id: userId});
    //
    //         if (!user) {
    //             throw new CustomError(`User with id ${userId} not found`, 404);
    //         }
    //
    //         res.json(user);
    //
    //     } catch (e) {
    //         next(e)
    //     }
    // },

    // deleteById: async (req, res,next) => {
    //     try {
    //         const {userId} = req.params;
    //
    //         await User.deleteOne({_id: userId})
    //
    //         res.status(201).json('user was delete');
    //
    //     } catch (e) {
    //         next(e)
    //     }
    // },

    updateById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const updatedUser = await userService.updateUser({_id: userId}, req.body);

            res.status(201).json(updatedUser);

        } catch (e) {
            next(e)
        }
    },

}
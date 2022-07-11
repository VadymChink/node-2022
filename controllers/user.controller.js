const {userService, s3Service, passwordService} = require('../services');
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
            const {password} = req.body;

            const hashPassword = await passwordService.hashPassword(password);

            let user = await userService.createUser({...req.body, password: hashPassword});

            if (req.files?.avatar) {
                const {Location} = await s3Service.uploadFile(req.files.avatar, 'user', user._id);
                user = await User.findByIdAndUpdate(user._id, {avatar: Location}, {new: true})
            }
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

            if (req.files.avatar)
            await s3Service.deleteFile(req.files.avatar);
            await userService.deleteUser({_id: userId});

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },

    updateById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            if (req.files?.avatar) {
                if (!req.user.avatar) {
                    const {Location} = await s3Service.uploadFile(req.files.avatar, 'user', userId);
                    req.body.avatar = Location;
                    console.log(req.body)
                } else {
                    await s3Service.updateFile(req.files.avatar, req.user.avatar);
                }
            }

            const updatedUser = await userService.updateUser({_id: userId}, req.body);

            res.status(201).json(updatedUser);

        } catch (e) {
            next(e)
        }
    },
}
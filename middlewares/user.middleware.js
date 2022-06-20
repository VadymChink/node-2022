const {CError} = require("../errors");
const {userService} = require("../services");

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.findOneUser({_id: userId});

            if (!user) {
                return next(new CError(`User with ID ${userId} not found`, 404))
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
    isValidUserForCreate: (req, res, next) => {
        try {

            const {name, email, password, age} = req.body;

            if (!name || name.length < 3) {
                return next(new CError('Set valid name'))
            }

            if (!Number.isInteger(age) || age < 18) {
                return next(new CError('Set valid age'))
            }

            if (!password || password.length < 8) {
                return next(new CError('Set valid password'))
            }

            if (!email || !email.includes('@')) {
                return next(new CError('Set valid email'))
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    isUserUniq: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneUser({email});

            if (user) {
                return next(new CError(`User with email ${email} is exist`, 409))
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    isValidUserForUpdate: (req, res, next) => {
        try {

            const {name, age} = req.body;

            if (!name || name.length < 3) {
                return next(new CError('Set valid name'))
            }

            if (!Number.isInteger(age) || age < 18) {
                return next(new CError('Set valid age'))
            }

            req.updatedUser = {name, age}

            next()
        } catch (e) {
            next(e)
        }
    },
}
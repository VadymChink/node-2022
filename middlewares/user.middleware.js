const {CError} = require("../errors");
const {userService} = require("../services");
const {userValidator} = require('../validators');

module.exports = {
    isValidUserForCreate: (req, res, next) => {
        try {
            const {error, value} = userValidator.newUserValidator.validate(req.body);

            if (error) {
                return next(new CError(error.details[0].message));
            }

            req.body = value

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserUniq: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneUser({email});

            if (user) {
                return next(new CError(`User with email ${email} is exist`, 409))
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserPresent: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.findOneUser({_id: userId});

            if (!user) {
                return next(new CError(`User with ID ${userId} not found`, 404))
            }

            next();
        } catch (e) {
            next(e)
        }

    },
    isValidUserForUpdate: (req, res, next) => {
        try {

            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                return next(new CError(error.details[0].message))
            }

            req.user = value;

            next();
        } catch (e) {
            next(e);
        }
    },

}
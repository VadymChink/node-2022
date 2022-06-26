const {CError} = require("../errors");
const {userValidator} = require("../validators");
const {Users} = require("../db");

module.exports = {
    checkUserOnCreate: (req, res, next) => {
        try {
            const {error, value} = userValidator.userValidatorForCreate.validate(req.body);

            if (error) {
                return next(new CError(error.details[0].message));
            }

            req.body = value;
            next();
        } catch (e) {
            next(e)
        }
    },
    isUserUniq: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await Users.findOne({email});

            if (user) {
                return next(new CError(`User with email; ${email} is exist`));
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkUserOnUpdate: (req, res, next) => {
        try {
            const {error, value} = userValidator.userValidatorForUpdate.validate(req.body);

            if (error) {
                return next(new CError(error.details[0].message));
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserPresent: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await Users.findOne({_id: userId});

            if (!user) {
                return next(new CError(`User with id ${userId} not found`, 404))
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
}
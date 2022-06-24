const {queryValidator,userValidator} = require("../validators");
const {CError} = require("../errors");
const {userService} = require("../services");
module.exports = {
    isQueryValid: (req, res, next) => {
        try {
            const {error, value} = queryValidator.findAll.validate(req.query);

            if (error) {
                return next(new CError(error.details[0].message));
            }

            req.query = value;
            next()
        } catch (e) {
            next(e)
        }
    },
    isUserValidForCreate: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

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
            const user = await userService.findOne({email});

            if (user) {
                return next(new CError(`User with email ${email} is exist`, 409))
            }

            next()
        } catch (e) {
            next(e)
        }
    },
    isUserPresentByID: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.findOne({_id: userId});
            if (!user) {
                return next(new CError(`User with Id ${userId} not fount`, 404))
            }
            req.user = user
            next()
        } catch (e) {
            next(e)
        }
    },
    isUserValidForUpdate: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                return next(new CError(error.details[0].message));
            }

            req.body = value;
            next();
        } catch (e) {
            next(e)
        }
    },

}
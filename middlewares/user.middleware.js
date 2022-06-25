const {userService} = require("../services");
const {CError} = require("../errors");
const {userValidator} = require("../validators");
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
    isValidBodyForCreate: (req, res, next) => {
        try {
            const {error, value} = userValidator.isValidBodyForCreate.validate(req.body);

            if (error) {
                return next(error.details[0].message)
            }

            req.body = value;

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
                return next(new CError(`User with email ${email} is exist`))
            }

            next()
        } catch (e) {
            next(e);
        }
    },
}
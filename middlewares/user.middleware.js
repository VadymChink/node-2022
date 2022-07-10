const {CError} = require("../errors");
const {userService} = require("../services");

module.exports = {
    isDataValid: (validator,dataType = 'body')=> (req, res, next) => {
        try {
            const {error, value} = validator.validate(req[dataType]);

            if (error) {
                return next(new CError(error.details[0].message));
            }

            req[dataType] = value;

            next();
        }catch (e) {
            next(e);
        }
    },



    isUserUniq: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findUser({email});

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

            const user = await userService.findUser({_id: userId});

            if (!user) {
                return next(new CError(`User with ID ${userId} not found`, 404))
            }

            req.user = user;
            next();
        } catch (e) {
            next(e)
        }

    },

}
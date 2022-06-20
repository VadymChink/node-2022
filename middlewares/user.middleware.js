const {CError} = require("../errors");
const {userService} = require("../services");

module.exports = {
    isValidUserForCreate: (req, res, next) => {
        try {
            const {name, age, email, password} = req.body;

            if (!name || name.length < 3) {
                return next(new CError('Enter valid name'))
            }
            if (!age || !Number.isInteger(age) || age < 18) {
                return next(new CError('Enter valid age'))
            }
            if (!email || !email.includes('@')) {
                return next(new CError('Enter valid email'))
            }
            if (!password || password < 8) {
                return next(new CError('Enter valid password'))
            }

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
            const {name, age} = req.body;

            if (name && name < 3) {
                return next(new CError('Enter valid name'));
            }
            if (age && age < 18 || !Number.isInteger(age)) {
                return next(new CError('Enter valid age'));
            }

            req.user = {name, age};

            next();
        } catch (e) {
            next(e);
        }
    },

}
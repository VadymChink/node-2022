const CustomError = require("../errors/customError");

module.exports = {
    checkUserOnCreate: (req, res, next) => {
        try {
            const {email = '', name = '', password = '', age = 0} = req.body;

            if (!email || !name || !password) {
                throw new CustomError('Some is filed is missing')
            }
            if (password.length < 5) {
                throw new CustomError('Password should include at least 5 symbols')
            }

            next();
        } catch (e) {
            next(e)
        }
    },
    checkIdOnValid: (req, res, next) => {
        try {
        const {userId} = req.params;

        if (userId.length !== 24) {
            throw new CustomError('Mongo Id not valid');
        }
            next();
        }catch (e) {
            next(e)
        }
    },
}
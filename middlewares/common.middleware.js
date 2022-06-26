const {Types} = require("mongoose");

const {CError} = require("../errors");

module.exports = {
    checkIdOnValid: (req, res, next) => {
        try {
            const {userId} = req.params;

            if (!Types.ObjectId.isValid(userId)) {
                return next(new CError('ID not valid'))
            }

            next();
        } catch (e) {
            next(e)
        }
    },
}
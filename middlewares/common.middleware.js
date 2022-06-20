const {Types} = require("mongoose");

const {CError} = require("../errors");

module.exports = {
    isValidId: (req, res, next) => {
        try {
            const {userId} = req.params;

            if (!Types.ObjectId.isValid(userId)) {
                return next(new CError('Not valid ID'))
            }

            next()
        } catch (e) {
            next(e)
        }
    },
}
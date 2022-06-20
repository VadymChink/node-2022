const {CError} = require("../errors");
const {Types} = require("mongoose");

module.exports = {
    isValidID: (req, res, next) => {
        try {
            const {userId} = req.params;

            if (!Types.ObjectId.isValid(userId)) {
                return next(new CError('Not valid ID'))
            }

            next()
        } catch (e) {
            next(e);
        }
    },
}
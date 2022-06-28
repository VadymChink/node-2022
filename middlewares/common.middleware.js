const {Types} = require("mongoose");
const {CError} = require("../errors");

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const {userId} = req.body;

            if (!Types.ObjectId.isValid(userId)){
                return next(new CError('Id not valid'))
            }

            next()
        }catch (e) {
            next(e);
        }
},
}
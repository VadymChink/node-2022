const {constants} = require("../constants");
const {CError} = require("../errors");

module.exports = {
    checkUserAvatar: async (req, res, next) => {
        try {
            if (!req.files?.avatar) {
                return next()
            }

            const {mimetype, size} = req.files.avatar;

            if (size > constants.IMAGE_MAX_SIZE) {
                return next(new CError('Max size 3MB'));
            }

            if (!constants.IMAGE_MIMETYPES.includes(mimetype)) {
                return next(new CError('Wrong file type'));
            }

            next();
        } catch (e) {
            next(e);
        }
    },
}
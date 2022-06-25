const bcrypt = require('bcrypt');
const {CError} = require("../errors");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePassword: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsSame) {
            throw new CError('Wrong password or email')
        }
    },
}

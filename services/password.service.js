const bcrypt = require('bcrypt');

const {CError} = require("../errors");

module.exports = {
    hashPassword:(password)=> bcrypt.hash(password,10),
    comparePassword: async (hashPassword, password)=>{

        const isPasswordSame = await bcrypt.compare(password,hashPassword);

        if (!isPasswordSame){
            throw  new CError('Wrong email or password');
        }
    },
}
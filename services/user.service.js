const {Users} = require("../db");

module.exports = {
    findAllUsers: (params = {}) => {
        return Users.find(params);
    },
    findOneUser: (params) => {
        return Users.findOne(params);
    },
    createUser: (user) => {
        return Users.create(user);
    },
    deleteOneUser: (params) => {
        return Users.deleteOne(params);
    },
    updateUser: (params, dataForUpdate, option = {new: true}) => {
        return Users.findByIdAndUpdate(params, dataForUpdate, option);
    },
}
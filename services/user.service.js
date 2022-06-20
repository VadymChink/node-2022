const {Users} = require("../db");

module.exports = {
    findAllUsers: (params = {}) => {
        return Users.find(params);
    },
    findOneUser: (params = {}) => {
        return Users.findOne(params)
    },
    createUsers: (user) => {
        return Users.create(user);
    },
    updateById: (params, updatedData, option = {new: true}) => {
        return Users.findByIdAndUpdate(params, updatedData, option)
    },
    deleteById: (params = {}) => {
        return Users.deleteOne(params)
    },
}
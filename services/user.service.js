const {User} = require("../dataBase");

module.exports = {
    findAllUsers: (params = {}) => {
        return User.find(params);
    },
    createUser: (user) => {
        return User.create(user);
    },
    findOneUser: (params = {}) => {
        return User.findOne(params);
    },
    deleteById: (params) => {
        return User.deleteOne(params);
    },
    updateById: (params, updatedData, option = {new: true}) => {
        return User.findByIdAndUpdate(params, updatedData, option);
    },
}
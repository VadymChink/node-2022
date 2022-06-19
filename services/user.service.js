const {User} = require('../db');

module.exports = {
    findAllUsers: (params = {}) => {
        return User.find(params);
    },
    findUser: (params) => {
        return User.findOne(params);
    },
    createUser: (user) => {
        return User.create(user);
    },
    updateUser: (params, data, options = {new: true}) => {
        return User.findByIdAndUpdate(params, data, options);
    },
    deleteUser: (params) => {
        return User.deleteOne(params);
    },

}
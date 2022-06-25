const {Users} = require("../dataBase");

module.exports = {
    findAllUsers: (params = {}) => {
        return Users.find(params);
    },
    findOneUser: (params = {}) => {
        return Users.findOne(params);
    },
    createUsers: (user) => {
        return Users.create(user);
    },
    deleteOneUser: (params = {}) => {
        return Users.deleteOne(params);
    },
    updateOneUser: (params, dataForUpdate, option = {new: true}) => {
        return Users.findByIdAndUpdate(params, dataForUpdate, option);
    },
}
const {Users} = require("../dataBase");

module.exports = {
    findAllUsers: (params = {}) => {
        return Users.find(params);
    },
    findOne: (params ) => {
        return Users.findOne(params)
    },
    createUser: (user) => {
        return Users.create(user)
    },
    deleteOne:(params)=>{
        return Users.deleteOne(params);
    },
    updateUser:(params,dataUpdate,option = {new:true})=>{
       return Users.findByIdAndUpdate(params,dataUpdate,option)
    }

}
const userRoute = require('express').Router();

const {userController} = require('../controllers');
const {fileMdlwr, userMdlwr} = require("../middlewares");
const {userValidator} = require("../validators");

userRoute.get('/',userController.findUsers);
userRoute.post('/',
    userMdlwr.isDataValid(userValidator.newUserValidator),
    fileMdlwr.checkUserAvatar,
    userMdlwr.isUserUniq ,
    userController.createUser);
userRoute.get('/:userId',userController.findUser);
userRoute.delete('/:userId',userMdlwr.isUserPresent,userController.deleteById);
userRoute.put('/:userId',
    userMdlwr.isDataValid(userValidator.userValidatorForUpdate),
    userMdlwr.isUserPresent,
    fileMdlwr.checkUserAvatar,
    userController.updateById);

module.exports = userRoute
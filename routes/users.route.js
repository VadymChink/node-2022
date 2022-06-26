const usersRoute = require('express').Router();

const {usersController} = require('../controllers');
const {userMdlwr, commonMdlwr, authMdlwr} = require('../middlewares');

usersRoute.get('/', usersController.getAllUsers);
usersRoute.post('/', userMdlwr.checkUserOnCreate, userMdlwr.isUserUniq, usersController.createUser);
// usersRoute.get('/:userId',userMdlwr.checkIdOnValid, usersController.getById);
// usersRoute.delete('/:userId',userMdlwr.checkIdOnValid, usersController.deleteById);
usersRoute.put('/:userId', commonMdlwr.checkIdOnValid, userMdlwr.checkUserOnUpdate,userMdlwr.isUserPresent,
    authMdlwr.checkAccessToken,
    usersController.updateById);

module.exports = usersRoute

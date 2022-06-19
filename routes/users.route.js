const usersRoute = require('express').Router();
const {usersController} = require('../controllers');
const userMdlwr = require('../middlewares/user.middleware');

usersRoute.get('/', usersController.getAllUsers)
usersRoute.post('/', userMdlwr.checkUserOnCreate, usersController.createUser)
usersRoute.get('/:userId',userMdlwr.checkIdOnValid, usersController.getById)
usersRoute.delete('/:userId',userMdlwr.checkIdOnValid, usersController.deleteById)
usersRoute.put('/:userId',userMdlwr.checkIdOnValid, usersController.updateById)

module.exports = {
    usersRoute,
}

const userRouter = require('express').Router();

const userController = require('../controlers/user.controller')

userRouter.get('/',userController.getAllUsers);
userRouter.post('/',userController.createUser);
userRouter.delete('/:userId',userController.deleteUserById);
userRouter.put('/:userId',userController.updateUserById);

module.exports = userRouter;
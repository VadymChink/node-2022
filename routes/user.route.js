const userRoute = require('express').Router();

const {userController} = require('../controllers');

userRoute.get('/',userController.findUsers);
userRoute.post('/',userController.createUser);
userRoute.get('/:userId',userController.findUser);
userRoute.delete('/:userId',userController.deleteById);
userRoute.put('/:userId',userController.updateById);

module.exports = userRoute
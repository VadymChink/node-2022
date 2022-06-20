const router = require('express').Router();

const {userController} = require("../controllers");
const {commonMdlwr, userMdlwr} = require("../middlewares");

router.get('/',userController.findAllUsers);
router.post('/',userMdlwr.isValidUserForCreate, userMdlwr.isUserUniq,userController.createUser);
router.get('/:userId',commonMdlwr.isValidId,userController.findOneUser);
router.delete('/:userId',
    commonMdlwr.isValidId,
    userMdlwr.isUserPresent,
    userController.deleteById);
router.put('/:userId',
    commonMdlwr.isValidId,
    userMdlwr.isValidUserForUpdate,
    userMdlwr.isUserPresent,
    userController.updateById);

module.exports = router;
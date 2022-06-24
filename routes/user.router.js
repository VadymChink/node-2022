const router = require('express').Router();

const {usersController} = require("../controllers");
const {userMdlwr, commonMdlwr, authMdlwr} = require("../middlewares");

router.get('/', userMdlwr.isQueryValid, usersController.findAllUsers);
router.post('/', userMdlwr.isUserValidForCreate, userMdlwr.isUserUniq, usersController.createUser);
router.get('/:userId', commonMdlwr.isValidId, userMdlwr.isUserPresentByID, usersController.findOneUser);
router.delete('/:userId', commonMdlwr.isValidId, userMdlwr.isUserPresentByID, authMdlwr.checkAccessToken, usersController.deleteUser);
router.put('/:userId',
    commonMdlwr.isValidId, userMdlwr.isUserValidForUpdate, authMdlwr.checkAccessToken,
    userMdlwr.isUserPresentByID, usersController.updateUser)

module.exports = router;
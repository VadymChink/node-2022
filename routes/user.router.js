const router = require('express').Router();

const {userController} = require("../controllers");
const {commonMdlwr, userMdlwr} = require("../middlewares");

router.get('/', userController.findAllUsers);
router.post('/',userMdlwr.isValidBodyForCreate,userMdlwr.isUserUniq, userController.createUser)
router.get('/:userId',commonMdlwr.isValidId,userMdlwr.isUserPresent, userController.findOneUser);


module.exports = router;
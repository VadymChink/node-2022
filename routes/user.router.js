const router = require('express').Router();

const {userControllers} = require("../controllers");
const {commonMdlwr, userMdlwr} = require("../middlewares");

router.get('/',
    userControllers.findAllUsers);
router.post('/', userMdlwr.isValidUserForCreate,
    userMdlwr.isUserUniq,
    userControllers.createUsers);
router.get('/:userId',
    commonMdlwr.isValidID,
    userMdlwr.isUserPresent,
    userControllers.findOneUser);
router.put('/:userId',
    commonMdlwr.isValidID,
    userMdlwr.isUserPresent,
    userMdlwr.isValidUserForUpdate,
    userControllers.updateById);
router.delete('/:userId',
    commonMdlwr.isValidID,
    userMdlwr.isUserPresent,
    userControllers.deleteById);

module.exports = router;
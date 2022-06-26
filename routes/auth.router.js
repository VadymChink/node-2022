const router = require('express').Router();

const {authController} = require("../controllers");
const {authMdlwr} = require("../middlewares");

router.post('/login', authMdlwr.isValidBodyForLogin, authMdlwr.isUserPresent,
    authController.login);
router.post('/refreshToken', authMdlwr.checkRefreshToken,
    authController.refreshToken);

module.exports = router;
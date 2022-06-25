const router = require('express').Router();

const {authController} = require("../controllers");
const {authMdlwr} = require("../middlewares");

router.post('/login', authMdlwr.isValidBodyForLogin, authMdlwr.isUserPresent, authController.login);
router.post('/refreshToken', authMdlwr.checkRefreshToken, authController.refreshToken);
router.post('/logout', authMdlwr.checkAccessToken, authController.logout);
router.post('/logoutAll', authMdlwr.checkAccessToken, authController.logoutAllDevice);

module.exports = router;
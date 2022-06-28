const {authMdlwr} = require("../middlewares");
const {authController} = require("../controllers");
const router = require('express').Router();

router.post('/login', authMdlwr.isBodyValid, authMdlwr.isUserPresent, authController.login);
router.post('/refreshToken', authMdlwr.checkRefreshToken, authController.refreshToken);
router.post('/logout', authMdlwr.checkAccessToken, authController.logout);
router.post('/logoutAll', authMdlwr.checkAccessToken, authController.logoutAllDevice);

module.exports = router;
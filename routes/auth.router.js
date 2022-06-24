const router = require('express').Router();

const {authMdlwr} = require("../middlewares");
const {authController} = require("../controllers");

router.post('/login', authMdlwr.isLoginBodyValid, authMdlwr.isUserPresentForAuth, authController.login);
router.post('/refreshToken', authMdlwr.checkRefreshToken, authController.refreshToken);
router.post('/refreshToken', authMdlwr.checkAccessToken, authController.logout);

module.exports = router;
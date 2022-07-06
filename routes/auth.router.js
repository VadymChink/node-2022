const {authController} = require("../controllers");
const {FORGOT_PASSWORD} = require("../constants/email-action.enum");
const {authMdlwr} = require("../middlewares");
const router = require('express').Router();

router.post('/login', authMdlwr.isBodyValid, authMdlwr.isUserPresent, authController.login);
router.post('/refreshToken', authMdlwr.checkRefreshToken, authController.refreshToken);
router.post('/logout', authMdlwr.checkAccessToken, authController.logout);
router.post('/logoutAll', authMdlwr.checkAccessToken, authController.logoutAllDevice);
router.post('/password/forgot', authMdlwr.isUserPresent, authController.forgotPassword);
router.post('/password/forgot/set', authMdlwr.isPasswordValid, authMdlwr.checkActionToken(FORGOT_PASSWORD), authController.setForgotPassword);

module.exports = router;
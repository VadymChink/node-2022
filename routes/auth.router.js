const router = require('express').Router();

const {authController} = require("../controllers");
const {authMdlwr} = require("../middlewares");
const {FORGOT_PASSWORD} = require("../constants/email-action.enum");


router.post('/login', authMdlwr.isBodyValid, authMdlwr.isUserPresent, authController.login);
router.post('/refreshToken', authMdlwr.checkRefreshToken, authController.refreshToken);
router.post('/logout', authMdlwr.checkAccessToken, authController.logout);
router.post('/logoutAll', authMdlwr.checkAccessToken, authController.logoutAllDevice);
router.post('/forgotPassword', authMdlwr.isUserPresent, authController.forgotPassword);
router.post('/forgotPassword/set', authMdlwr.isPasswordValid, authMdlwr.checkActionToken(FORGOT_PASSWORD), authController.setForgotPassword);

module.exports = router;
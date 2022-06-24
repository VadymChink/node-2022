const router = require('express').Router();

const {authController} = require('../controllers');
const {userMdlwr} = require("../middlewares");

router.post('/login',userMdlwr.isUserPresentWithEmail, authController.login);

module.exports = router;

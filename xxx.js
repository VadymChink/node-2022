const {tokenService} = require("./services");
const {FORGOT_PASSWORD} = require("./constants/email-action.enum");

const _id= 65446464456;
const name ="vadym";

const token = tokenService.generateActionToken(FORGOT_PASSWORD, {name, _id});
console.log(token)
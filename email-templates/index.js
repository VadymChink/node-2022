const emailAction = require('../constants/email-actions.enums');

module.exports = {
    [emailAction.WELCOME]:{
        subject: 'Welcome to platform',
        template: 'welcome'
    },
    [emailAction.FORGOT_PASSWORD]:{
        subject: 'forgot password',
        template: 'forgot-password'
    }
}
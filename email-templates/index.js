const emailAction = require('../constants/email-actions.enums');

module.exports = {
    [emailAction.WELCOME]:{
        subject: 'Welcome on bord',
        template: 'welcome',
    },
    [emailAction.FORGOT_PASSWORD]:{
        subject: 'Ops looks like you forgot password',
        template: 'forgot-password',
    }
}
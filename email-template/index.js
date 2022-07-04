const emailAction = require('../constants/email-actions.enums');

module.exports = {
    [emailAction.WELCOME]: {
        subject: 'welcome',
        template: 'welcome',
    },
    [emailAction.FORGOT_PASSWORD]: {
        subject: 'forgot password',
        template: 'forgot_password',
    },

}
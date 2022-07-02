const emailAction = require('../constants/email-actions.enums');

module.exports = {
    [emailAction.WELCOME]: {
        subject: 'welcome on board',
        template: 'welcome',
    },
    [emailAction.FORGOT_PASSWORD]: {
        subject: 'ops forgot password',
        template: 'forgot-password.pug'
    }
}
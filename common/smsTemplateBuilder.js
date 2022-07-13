const smsActions = require('../enums/sms-action.enum');

module.exports = {
    [smsActions.WELCOME]: ({name}) => {
        return `Hi ${name}, welcome on our platform`;
    },
}
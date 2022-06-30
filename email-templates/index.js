const {emailActions} = require('../constants');

module.exports = {
    [emailActions.WELCOME]:{
        subject:'Welcome on board',
        template: 'welcome'
    },
    [emailActions.FORGOT_PASSWORD]:{
        subject: 'Opps look like you forgot password ',
        template : 'forgot-password'
    }
}
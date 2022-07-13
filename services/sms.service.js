const {config} = require('../constants');
const twilio = require('twilio');

const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
module.exports = {
    sendSms: async (phone = '+380671149391', message) => {
        try {
            console.log(`sms start sending | to: ${phone} | message: ${message}`)

            await client.messages
                .create({
                    from: config.TWILIO_NUMBER,
                    to: phone,
                    body: message,
                })
            console.log(`sms send sending | to: ${phone} | message: ${message}`)
        } catch (e) {
            console.error(`sms error | to :${phone} | message ${e}`)
        }
    },
}

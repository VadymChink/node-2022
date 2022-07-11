const cron = require('node-cron');

const deleteOldTokens = require('./remove-old-oauth-tokens');

module.exports = () => {
    cron.schedule('0 0 1  * *', deleteOldTokens)
}

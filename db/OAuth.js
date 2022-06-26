const { Schema, model } = require('mongoose');

const OAuthSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'users'
    },

    access_token: {
        type: String,
        required: true,
    },

    refresh_token: {
        type: String,
        required:true,
    },
}, { timestamps: true });

module.exports = model('oauth', OAuthSchema);
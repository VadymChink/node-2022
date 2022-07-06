const {Schema, model, Types} = require('mongoose');

const emailAction = require('../constants/email-action.enum');

const ActionTokenSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: 'users'
    },
    token: {
        type: String,
        required: true
    },
    actionType: {
        type: String,
        enum: Object.values(emailAction),
        required: true
    }

}, {timestamps: true})

module.exports = model('action_token', ActionTokenSchema);
const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
    },
    avatar: String

}, {timestamps: true})

module.exports = model('users', UserSchema);
const {Schema, model} = require('mongoose');

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        default: 18,
    }

}, {timestamps: true})

module.exports = model('users', UsersSchema)
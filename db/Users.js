const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        default: 18,
    },
})

module.exports = model('users', UserSchema);
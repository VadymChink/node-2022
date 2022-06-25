const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
},{ timestamps: true });

module.exports = model('users', UserSchema);
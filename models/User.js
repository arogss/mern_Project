const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    registered: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('user', UserSchema);

module.exports = User;

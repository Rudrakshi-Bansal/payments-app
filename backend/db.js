const mongoose = require('mongoose');

require('dotenv').config();
const connection_string = process.env.MONGO_URI;

mongoose.connect(connection_string)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    firstname: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
    },
    lastname: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
    },
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        default: 1000,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User, Account
}
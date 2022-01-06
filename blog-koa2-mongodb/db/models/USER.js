/**
 * user collection
 */
const mongoose = require('../db');

// create schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    realname: {
        type: String
    }
}, { timestamps: true });

// create Model based on UserSchema
const User = mongoose.model('user', UserSchema);

module.exports = User;
// users collection

const mongoose = require('../db');

// 用schema 定义数据规范
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true, // 必需
        unique: true // 唯一，不能重复
    },
    password: String,
    realname: String
});

// Model 对应 collection
const User = mongoose.model('user', UserSchema);

module.exports = User;
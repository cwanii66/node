// blogs collection

const mongoose = require('../db');

// define data format - blog
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    content: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: true
    }
});

// 将 Schema 映射到对应collection中
const Blog = mongoose.model('blog', BlogSchema);

// 将规范后的blog 输出
module.exports = Blog;

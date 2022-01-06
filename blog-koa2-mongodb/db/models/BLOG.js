/**
 * blog collection
 */

const mongoose = require('../db');

// create blog schema
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    author: {
        type: String,
        required: true
    }
}, { timestamps: true }); // timestamp => 时间戳

// create blog Model based on BlogSchema
const Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;

const express = require('express');
const { 
    getList, 
    getDetail, 
    newBlog, 
    updateBlog, 
    delBlog
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const router = express.Router();

router.get('/list', (req, res, next) => {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';

    const result = getList(author, keyword);
    return result.then(listData => {
        res.json(new SuccessModel(listData));
    });
});

router.get('/detail', (req, res, next) => {
    res.json({
        errno: 0,
        data: 'blog detail'
    });
});

module.exports = router;
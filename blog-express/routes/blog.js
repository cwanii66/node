const express = require('express');
const { 
    getList, 
    getDetail, 
    newBlog, 
    updateBlog, 
    delBlog
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck'); 

const router = express.Router();

router.get('/list', async (req, res, next) => {
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';

    if (req.query.isadmin) {
        console.log('is admin');
        // 管理员界面
        if (req.session.username == null) {
            console.error('is admin, but not login');
            // 未登录
            res.json(
                new ErrorModel('未登录')
            );
            return;
        }

        author = req.session.username;
    }

    const result = getList(author, keyword);
    const listData = await result;
    res.json(new SuccessModel(listData));
});

router.get('/detail', async (req, res, next) => {
    const result = getDetail(req.query.id);
    const data = await result;
    res.json(new SuccessModel(data));
});

router.post('/new', loginCheck, async (req, res, next) => {
    req.body.author = req.session.username;
    const newData = await newBlog(req.body);
    res.json(new SuccessModel(newData));
});

router.post('/update', loginCheck, async (req, res, next) => {
    const result = await updateBlog(req.body, req.query.id);
    if (result) {
        res.json(new SuccessModel());
    } else {
        res.json(new ErrorModel('更新博客失败'));
    }
});

router.post('/del', loginCheck, async (req, res, next) => {
    const author = req.session.username;
    const result = await delBlog(req.query.id, author);
    if (result) {
        res.json(new SuccessModel());
    } else {
        res.json(new ErrorModel('删除博客失败'));
    }
});

module.exports = router;
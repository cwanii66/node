const router = require('koa-router')();
const { 
    getList, 
    getDetail, 
    newBlog, 
    updateBlog, 
    delBlog
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck'); 

router.prefix('/api/blog');

router.get('/list', async (ctx, next) => {
    let author = ctx.query.author || '';
    const keyword = ctx.query.keyword || '';

    if (ctx.query.isadmin) {
        console.log('is admin');
        // 管理员界面
        if (ctx.session.username == null) {
            console.error('is admin, but not login');
            // 未登录
            ctx.body = new ErrorModel('未登录');
            return;
        }
        author = ctx.session.username;
    }
    const listData = await getList(author, keyword);
    ctx.body = new SuccessModel(listData);
});

router.get('/detail', async (ctx, next) => { 
    const data = await getDetail(ctx.query.id);
    ctx.body = new SuccessModel(data);
});

router.post('/new', loginCheck, async (ctx, next) => {
    const body = ctx.request.body;
    body.author = ctx.session.username;
    const newData = await newBlog(body);
    ctx.body = new SuccessModel(newData);
});

router.post('/update', loginCheck, async (ctx, next) => {
    const result = await updateBlog(ctx.request.body, ctx.query.id);
    if (result) {
        ctx.body = new SuccessModel();
    } else {
        ctx.body = new ErrorModel('更新博客失败');
    }
});

router.post('/del', loginCheck, async (ctx, next) => {
    const author = ctx.session.username;
    const result = await delBlog(ctx.query.id, author);
    if (result) {
        ctx.body = new SuccessModel();
    } else {
        ctx.body = new ErrorModel('删除博客失败');
    }
});

module.exports = router;
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { get } = require('../db/redis');

const loginCheck = function(req) { // 只是为了拦截未登录的用户
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登录')
        );
    }
}; // 没有登录没有权限做任何操作，提示将会有前端展示


const handleBlogRouter = function(req, res) {
    const method = req.method; //
    const id = req.query.id;
    
    // get blog list
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || '';
        const keyword = req.query.keyword || '';
        // const listData = getList(author, keyword);

        // return new SuccessModel(listData);
        if (req.query.isadmin) {
            // 管理员界面
            const loginCheckResult = loginCheck(req);
            if (loginCheckResult) {
                // 未登录
                return loginCheckResult;
            }
            // 强制查询自己的博客
            author = req.session.username;
        }

        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        });
    }
    // get blog detail
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id);
        return result.then(blogDetail => {
            return new SuccessModel(blogDetail);
        });
    }
    // post new blog
    if (method === 'POST' && req.path === '/api/blog/new') {

        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult;
        }

        req.body.author = req.session.username;
        const result = newBlog(req.body);
        return result.then(newBlogData => {
            return new SuccessModel(newBlogData);
        });
    }

    // post update blog
    if (method === 'POST' && req.path === '/api/blog/update') {

        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult;
        }

        const result = updateBlog(req.body, id);
        return result.then(updateMsg => {
            if (updateMsg) {
                return new SuccessModel(updateMsg);
            } else {
                return new ErrorModel('更新博客失败');
            }
        })
            .catch(updateErrMsg => console.log(updateErrMsg));
    }

    // post delete blog
    if (method === 'POST' && req.path === '/api/blog/del') {

        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult;
        }

        const author = req.session.username;
        const result = delBlog(id, author);
        return result.then(deleteMsg => {
            if (deleteMsg) {
                return new SuccessModel(deleteMsg);
            } else {
                return new ErrorModel('删除博客失败');
            }
        });
    }
}

module.exports = handleBlogRouter;
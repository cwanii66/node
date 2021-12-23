const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleBlogRouter = function(req, res) {
    const method = req.method; //
    const id = req.query.id;
    
    // get blog list
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        // const listData = getList(author, keyword);

        // return new SuccessModel(listData);
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
        req.body.author = 'jack'; // 假数据，待开发 -- 登录时再改成真实数据
        const result = newBlog(req.body);
        return result.then(newBlogData => {
            return new SuccessModel(newBlogData);
        });
    }

    // post update blog
    if (method === 'POST' && req.path === '/api/blog/update') {
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
        const author = '张三'; // 假数据，开发登录时修改
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
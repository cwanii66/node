const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleBlogRouter = function(req, res) {
    const method = req.method; //
    const id = req.query.id;
    
    // get blog list
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author, keyword);

        return new SuccessModel(listData);
    }
    // get blog detail
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const data = getDetail(id);
        return new SuccessModel(data);
    }
    // post new blog
    if (method === 'POST' && req.path === '/api/blog/new') {
        const blogData = req.body;
        const data = newBlog(blogData);
        return new SuccessModel(data);

    }

    // post update blog
    if (method === 'POST' && req.path === '/api/blog/update') {
        const blogData = req.body ?? {};
        const data = updateBlog(blogData, id);
        if (data.msg) {
            return new SuccessModel(data);
        } else {
            return new ErrorModel(data);
        }
        
    }

    // post delete blog
    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = delBlog(id);
        if (result) {
            return new SuccessModel();
        } else {
            return new ErrorModel('删除失败');
        }
    }
}

module.exports = handleBlogRouter;
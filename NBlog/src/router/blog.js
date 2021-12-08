const { getList, getDetail } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleBlogRouter = function(req, res) {
    const method = req.method; //
    
    // get blog list
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author, keyword);

        return new SuccessModel(listData);
    }
    // get blog detail
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id;
        const data = getDetail(id);
        return new SuccessModel(data)
    }
    // post new blog
    if (method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg: 'new blog api'
        }
    }
    // post delete blog
    if (method === 'POST' && req.path === '/api/blog/del') {
        return {
            msg: 'delete blog api'
        }
    }
}

module.exports = handleBlogRouter;
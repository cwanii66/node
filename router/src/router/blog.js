const handleBlogRouter = function(req, res) {
    const method = req.method; //
    const url = req.url;
    const path = url.split('?')[0];
    
    // get blog list
    if (method === 'GET' && path === '/api/blog/list') {
        return {
            msg: 'blog list api'
        }
    }
    // get blog detail
    if (method === 'GET' && path === '/api/blog/detail') {
        return {
            msg: 'blog detail api'
        }
    }
    // post new blog
    if (method === 'POST' && path === '/api/blog/update') {
        return {
            msg: 'new blog api'
        }
    }
    // post delete blog
    if (method === 'POST' && path === '/api/blog/del') {
        return {
            msg: 'delete blog api'
        }
    }
}

module.exports = handleBlogRouter;
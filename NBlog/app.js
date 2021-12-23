// const { resolve } = require('path');
const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const getPostData = (req) => {
    return new Promise((resolve) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve('content-type is not JSON');
            return;
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(
                JSON.parse(postData)
            )
        });
    })
}

const serverHandler = function(req, res) {
    // set JSON type
    res.setHeader('Content-type', 'application/json');

    //获取path
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析query
    req.query = querystring.parse(url.split('?')[1]);
    
    // 解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return;
        }
        const entries = item.split('=');
        const key = entries[0];
        const value = entries[1];
        req.cookie[key] = value;
    });
    console.log('req.cookie is ', req.cookie);

    // 处理post data
    getPostData(req).then(postData => {
        // 我们总是需要获取用户post的数据
        req.body = postData;

        // 处理blog路由
        // controller => router => app
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                if (blogData) {
                    res.end(
                        JSON.stringify(blogData)
                    );
                    return;
                }
            });
            return;
        }

        // 处理user路由
        // controller => router => app
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
                if (userData) {
                    res.end(
                        JSON.stringify(userData)
                    );
                    return;
                }
            });
            return;
        }

        // 未命中任何路由
        res.writeHead(404, {"Content-type": "text/plain"});
        res.write("404 Not Found\n");
        res.end();
    })
};

module.exports = serverHandler;

// process.env.NODE_ENV


// 系统基础功能设置
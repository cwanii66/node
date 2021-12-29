// const { resolve } = require('path');
const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// session 数据
const SESSION_DATA = {};

// 获取cookie过期时间
const getCookieExpires = function() {
    const date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    return date.toGMTString();
};

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
};

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
        const key = entries[0].trim();
        const value = entries[1].trim();
        req.cookie[key] = value;
    });
    
    // 解析 session
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {};
        }
    } else {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {};
    }
    req.session = SESSION_DATA[userId];
    // console.log(req.session);

    // 处理post data
    getPostData(req).then(postData => {
        // 我们总是需要获取用户post的数据
        req.body = postData;

        // 处理blog路由
        // controller => router => app
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    // 操作cookie
                    res.setHeader('set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
                }
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
                if (needSetCookie) {
                    // 操作cookie
                    res.setHeader('set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
                }

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
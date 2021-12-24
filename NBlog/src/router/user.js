const { login } = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/resModel');

// 获取cookie过期时间
const getCookieExpires = function() {
    const date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    console.log('date.toGMTString is ' + date.toGMTString());
    return date.toGMTString();
}

const handleUserRouter = function(req, res) {
    const method = req.method; // GET POST ...

    if (method === 'GET' && req.path === '/api/user/login') {
        const { username, password } = req.query;
        const result = login(username, password);
        return result.then(loginData => {
            if (loginData.username) {
                
                // 操作cookie
                res.setHeader('set-Cookie', `username=${loginData.username}; path=/; httpOnly; expires=${getCookieExpires()}`);
                return new SuccessModel(loginData);
            }
            return new ErrorModel('登录失败');
        });
    }

    // 登录验证测试
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel({username: req.cookie.username}));
        }
        return Promise.resolve(new ErrorModel('尚未登录'));
    }
}

module.exports = handleUserRouter;
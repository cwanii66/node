const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { set } = require('../db/redis');

const handleUserRouter = function(req, res) {
    const method = req.method; // GET POST ...

    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        const result = login(username, password);
        return result.then(loginData => {
            if (loginData.username) {
                // 设置session
                req.session.username = loginData.username;
                req.session.realname = loginData.realname;
                // 同步到redis
                set(req.sessionId, req.session);
                return new SuccessModel(loginData);
            }
            return new ErrorModel('登录失败');
        });
    }

    // 登录验证测试
    // if (method === 'GET' && req.path === '/api/user/login-test') {
    //     if (req.session?.username) {
    //         return Promise.resolve(new SuccessModel({session: req.session}));
    //     }
    //     return Promise.resolve(new ErrorModel('尚未登录'));
    // }
}

module.exports = handleUserRouter;
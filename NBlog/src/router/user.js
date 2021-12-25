const { login } = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/resModel');



const handleUserRouter = function(req, res) {
    const method = req.method; // GET POST ...

    if (method === 'GET' && req.path === '/api/user/login') {
        const { username, password } = req.query;
        const result = login(username, password);
        return result.then(loginData => {
            if (loginData.username) {
                // 设置session
                req.session.username = loginData.username;
                req.session.realname = loginData.realname;
                return new SuccessModel(loginData);
            }
            return new ErrorModel('登录失败');
        });
    }

    // 登录验证测试
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.session.username) {
            return Promise.resolve(new SuccessModel({session: req.session}));
        }
        return Promise.resolve(new ErrorModel('尚未登录'));
    }
}

module.exports = handleUserRouter;
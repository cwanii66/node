const { verifyLogin } = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/resModel');

const handleUserRouter = function(req, res) {
    const method = req.method; // GET POST ...

    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        const result = verifyLogin(username, password);
        return result.then(loginData => {
            if (loginData.username) {
                return new SuccessModel(loginData);
            }
            return new ErrorModel('登录失败');
        });
    }
}

module.exports = handleUserRouter;
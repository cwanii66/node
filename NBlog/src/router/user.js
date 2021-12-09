const { verifyLogin } = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/resModel');

const handleUserRouter = function(req, res) {
    const method = req.method; // GET POST ...

    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        const res = verifyLogin(username, password);

        if (res) {
            return new SuccessModel(res);
        } else {
            return new ErrorModel('fail to login');
        }

    }
}

module.exports = handleUserRouter;
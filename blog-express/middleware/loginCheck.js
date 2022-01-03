const { ErrorModel } = require('../model/resModel');

module.exports = function(req, res, next) {
    if (req.session.username) {
        next();
        return;
    }
    res.json(
        new ErrorModel('未登录')
    )
};
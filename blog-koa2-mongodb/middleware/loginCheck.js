const { ErrorModel } = require('../model/resModel');

module.exports = async function(ctx, next) {
    if (ctx.session.username) {
        await next();
        return;
    }
    ctx.body = new ErrorModel('未登录');
};
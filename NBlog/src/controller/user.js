const verifyLogin = (userName, password) => {
    // 使用假数据
    if (userName === 'zhangsan' && password === '123') {
        return true;
    }
    return false;
}

module.exports = {
    verifyLogin
}
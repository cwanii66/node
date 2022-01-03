const crypto = require('crypto');

// 密匙
const SECRET_KEY = 'asdfhasigoda16fasd6g';

// md5 加密
const md5 = function(content) {
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
};

// 加密函数
const genPassword = function(password) {
    const str = `password=${password}&key=${SECRET_KEY}`;
    return md5(str);
};

module.exports = {
    genPassword
}
// console.log(genPassword('abc'));
const { execute } = require('../db/mysql');

const verifyLogin = async (username, password) => {
    const sql_login = `
        select username, realname from users
            where username = '${username}' and password = '${password}';
    `;
    // select 返回的全都是 数组
    const rows = await execute(sql_login);
    return rows[0] ?? {};
    
}

module.exports = {
    verifyLogin
}
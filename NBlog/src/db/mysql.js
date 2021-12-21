const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/db');

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
con.connect();

// 统一执行sql的函数
const execute = function(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    })
};
// 我们只是多次运用exec函数, connect 对象是一个单例对象, 它不会重复建立

module.exports = {
    execute
};
const fs = require('fs');
const path = require('path');

// 写日志
const writeLog = function(writeStream, log) {
    writeStream.write(log + '\n'); // core 写入一行日志
};

// 生成write Stream
const createWriteStream = function(fileName) {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName);
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    });
    return writeStream;
};

// 写访问日志
const accessWriteStream = createWriteStream('access.log');
const access = function(log) {
    writeLog(accessWriteStream, log)
};

module.exports = {
    access
};
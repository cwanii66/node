// 标准输入输出
// process.stdin.pipe(process.stdout);

const fs = require('fs');
const path = require('path');
const http = require('http');
/**
 * const server = http.createServer((req, res) => {
 *      if (req.method === 'POST') {
 *          req.pipe(res); // pipe model
 *      }
 * });
 * server.listen(8002);
 */

// 复制文件
// const fileName1 = path.resolve(__dirname, 'data.txt');
// const fileName2 = path.resolve(__dirname, 'data-bak.txt');
// // 读取stream对象
// const readStream = fs.createReadStream(fileName1);
// // 写入文件的Stream对象
// const writeStream = fs.createWriteStream(fileName2);
// // 通过pipe 执行拷贝
// readStream.pipe(writeStream);

// // 数据块
// readStream.on('data', chunk => {
//     console.log(chunk.toString());
// }); // 一块一块传输

// // 数据读取完成，即拷贝完成
// readStream.on('end', () => {
//     console.log('finish...');
// });

const fileName1 = path.resolve(__dirname, 'data.txt');
const server = http.createServer((req, res) => {
    if (req.methods === 'GET') {
        const readStream = fs.createReadStream(fileName1);
        readStream.pipe(res);
    }
});
server.listen(8003);

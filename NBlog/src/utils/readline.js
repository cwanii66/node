const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 文件名
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log');

// 创建read stream
const readStream = fs.createReadStream(fileName);

// 创建readline对象(readline本身就是基于stream的)
const readLine = readline.createInterface({
    input: readStream
});

let EdgNo = 0;
let totalNo = 0;

// 开始逐行读取
readLine.on('line', (lineData) => {
    if (!lineData || lineData.toString() === '') {
        return;
    }
    // 记录总行数
    totalNo++;
    
    const arr = lineData.split(' -- ');
    if (arr[2] && arr[2].includes('Edg')) {
        // 累加edg 的数量
        EdgNo++;
    }
});
// 监听读取完成
readLine.on('close', () => {
    console.log('Edg 占比: ' + EdgNo / totalNo);
});
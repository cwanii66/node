const fs = require('fs');
const path = require('path');

const content = 'NEW CONTENT\n';
const option = {
    flag: 'a', // 追加写入，重写‘w'
}

const fileName = path.resolve(__dirname, 'data.log');

// 读取文件内容
fs.readFile(fileName, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    // data是二进制类型，需要转换为字符串
    console.log(data.toLocaleString());
});

// 写入文件
fs.writeFile(fileName, content, option, err => { // 同样直接write 也很耗费
    if (err) {
        console.log(err);
    }
    console.log('写入成功');
});

// 判断文件是否存在
fs.stat(fileName, (err, stats) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(stats);
}); /* fs.access(file, constants.W_OK | contants.F_OK, err => {
    // ...
})*/
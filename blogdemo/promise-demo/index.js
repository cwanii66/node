const fs = require('fs');
const path = require('path');

// callback 方式获取一个文件内容
/**
 * function getFileContent(fileName, callback) {
    const fullFileName = path.resolve(__dirname, fileName);
    fs.readFile(fullFileName, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        callback(
            JSON.parse(data.toLocaleString())
        );
    })
}
// 测试 callback hell
getFileContent('a.json', targetData => { 
    console.log('data --> ', targetData);
    getFileContent(targetData.next, BData => {
        console.log('bdata --> ', BData);
        getFileContent(BData.next, CData => {
            console.log('cdata --> ', CData);
        })
    })
});
*/

// use promise
function getFileContent(fileName) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, fileName);
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(
                JSON.parse(data.toLocaleString())
            );
        });
    });
    return promise;
}

getFileContent('a.json')
    .then(adata => {
        console.log('adata ', adata);
        return getFileContent(adata.next);
    })
    .then(bdata => {
        console.log('bdata ', bdata);
        return getFileContent(bdata.next);
    })
    .then(cdata => {
        console.log('adata ', cdata);
    })

// async await
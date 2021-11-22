const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        // data type
        console.log('content-type: ', req.headers['content-type']);
        // receive data
        let postData = '';
        req.on('data', chunk => {  //stream 流 on 一般是触发接受事件流
            postData += chunk.toString(); //chunk 格式转换
        })
        req.on('end', () => {
            console.log(postData);
            res.end('hello, world!'); // return here, cause async
        })
    }
});
server.listen(8000);
console.log('server established...')
// const http = require('http');

// const server = http.createServer((req, res) => {
//     if (req.method === 'POST') {
//         // data type
//         console.log('content-type: ', req.headers['content-type']);
//         // receive data
//         let postData = '';
//         req.on('data', chunk => {  //stream 流 on 一般是触发接受事件流
//             postData += chunk.toString(); //chunk 格式转换
//         })
//         req.on('end', () => {
//             console.log(postData);
//             res.end('hello, world!'); // return here, cause async
//         })
//     }
// });
// server.listen(8000);
// console.log('server established...')

const http = require('http');
const querystring = require('querystring');



const server = http.createServer((request, response) => {
    const method = request.method;
    const url = request.url;
    const path = url.split('?')[0];
    const query = querystring.parse(url.split('?')[1]);

    const resEvent = function() {
        let postData = '';
        request.on('data', chunk => {
            postData += chunk.toString();
        });
        request.on('end', () => {
            resData.postData = postData;
            // 返回postData到resData
        });
    }

    // 返回格式为json
    response.setHeader('Content-type', 'application/json');
    // 返回数据
    const resData = {
        method,
        url,
        path,
        query
    }
    // 返回
    switch(method) {
        case 'GET':
            response.end(
                JSON.stringify(resData)
            );
            break;
        case 'POST':
            resEvent();
            break;  
    }
})

server.listen(8000);
console.log("I'm listening...");
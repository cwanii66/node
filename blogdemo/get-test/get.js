const http = require('http');
const querystring = require('querystring');
const URL = require('url');

const server = http.createServer((req, res) => {
    console.log(req.method) //get
    const url = req.url
    console.log('url: ', url)
    req.query = querystring.parse(url.split('?')[1])
    res.end(JSON.stringify(req.query));
})

server.listen(8000)
console.log('ok')
const http = require('http');

const hostname = '127.0.0.1';
const port = '3000';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html; charset=utf-8');
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    console.log(url);
    if (pathname === '/login') {
        res.end(`<button>BUTTON</button>`)
    } else {
        res.end(``);
    }
})

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}: ${port}/`);
})




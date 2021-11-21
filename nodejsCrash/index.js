// const Logger = require('./logger')

// const logger = new Logger();

// logger.on('message', (data) => {
//     console.log('called listener: ', data)
// })

// logger.log('hello world')
// logger.log('hi')

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log(req.url);
    // if (req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //         if (err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/html' });
    //         res.end(content);
    //     })
    // }

    // if (req.url === '/api/users') {
    //     // normally we would do is fetch data from a database and serve that
    //     const users = [
    //         {
    //             name: 'Bob',
    //             age: 8
    //         }, {
    //             name: 'Jack',
    //             age: 6
    //         }
    //     ];
    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify(users))
    // }

    // Build file path
    let filePath = path.join(
        __dirname, 
        'public', 
        req.url === '/' ? 'index.html' : req.url
    );
    // Extension of file
    let exname = path.extname(filePath);

    // Initial content type
    let contentType = 'text/html';

    // Check ext and set contentType
    switch(exname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        default:
            break;
    }

    // Read File
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code = 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'),
                    (err, content) => { 
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(content, 'utf-8');
                })
            } else {
                // Some server err
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
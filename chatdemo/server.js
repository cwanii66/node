let http = require('http');
let fs = require('fs');
let path = require('path');
let mime = require('mime');
let cache = {};
let chatServer = require('./lib/chat_server');
chatServer.listen(server);

function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resource not found');
    response.end();
}

function sendFile(response, filePath, fileContents) {
    response.writeHead(
        200,
        { "Content-type": mime.lookup(path.basename(filePath)) }
    );
    response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function(exists) {
            if (exists) {
                fs.readFile(absPath, function(err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response);
            }
        });
    }
}

let server = http.createServer(function(request, response) {
    let filePath = false;
    
    if (request.url === '/') {
        filePath = 'public/index.html';
    } else {
        filePath = 'public' + request.url;
    }

    let absPath = './' + filePath;
    serveStatic(response, cache, absPath);
});

server.listen(5500, function() {
    console.log("Serve listening on port 3000");
});


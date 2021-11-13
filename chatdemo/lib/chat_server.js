
let socketio = require('socket.io');
let io;
let guestNumber = 1;
let nickNames = {};
let namesUsed = [];
let currentRoom = {};

exports.listen = function(server) {
    io = socketio.listen(server);
    io.set('log level', 1);
    
    io.sockets.on('connection', funtion(socket) {
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);

        joinRoom(socket, 'Lobby');
        
    })
}
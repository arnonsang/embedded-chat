const joinRoomHandler = require('./handler/join-room.js');
const clientMessageHandler = require('./handler/client-message.js');
const disconnectHandler = require('./handler/disconnect.js');

const socketEvent = (io) => {

    let activeRooms = [];
    
    io.on('connection', (socket) => {

        socket.on('disconnect', (msg) => disconnectHandler(io, socket, activeRooms, msg));

        socket.on('join-room', (msg) => joinRoomHandler(io, socket, activeRooms, msg));

        socket.on('client-message', (msg) => clientMessageHandler(io, activeRooms, msg));
        
    });
}

module.exports = socketEvent;
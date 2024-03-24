const joinRoomHandler = require('./handlers/join-room.js');
const clientMessageHandler = require('./handlers/client-message.js');
const disconnectHandler = require('./handlers/disconnect.js');

const socketEvent = (io) => {
    let activeRooms = [];
    io.on('connection', (socket) => {
        socket.on('disconnect', (msg) => disconnectHandler(io, socket, activeRooms, msg));
        socket.on('join-room', (msg) => joinRoomHandler(io, socket, activeRooms, msg));
        socket.on('client-message', (msg) => clientMessageHandler(io, activeRooms, msg));
    });
}

module.exports = socketEvent;
const joinRoomHandler = require('./handlers/join-room.js');
const clientMessageHandler = require('./handlers/client-message.js');
const disconnectHandler = require('./handlers/disconnect.js');

const socketEvent = (io) => {
    let activeRooms = [];
    let socketRooms = [];
    io.on('connection', (socket) => {
        socket.on('disconnect', (msg) => disconnectHandler(io, socket, activeRooms, msg));
        socket.on('join-room', (msg) => joinRoomHandler(io, socket, activeRooms, msg));
        socket.on('client-message', (msg) => clientMessageHandler(io, activeRooms, msg));
        socket.adapter.on('join-room', (room, id) => {
            const users = {
                room:socket.room ?? room,
                user:socket.username ?? id
            }
            //check if user already in room
            const userExist = socketRooms.filter((user) => {
                return user.user === users.user;
            });
            if(userExist.length === 0){
                socketRooms.push(users);
            }
            socket.emit('user-list', socketRooms);
        });
        socket.adapter.on('leave-room', (room) => {
            socketRooms = socketRooms.filter((user) => {
                return user.user !== socket.username;
            });
            socket.emit('user-list', socketRooms);
        });
        socket.adapter.on('delete-room', (room) => {
            socketRooms = socketRooms.filter((user) => {
                return user.room !== room;
            });
            socket.emit('user-list', socketRooms);
        });
    });
}

module.exports = socketEvent;
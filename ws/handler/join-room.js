const joinRoomHandler = (io, socket, activeRooms, msg) => {
    console.log(`${msg.username} joined the chat ${msg.room}`);
    socket.username = msg.username;
    socket.room = msg.room;
    socket.join(msg.room);
    activeRooms.push({
        room: msg.room,
        user: msg.username,
    });
    io.to(msg.room).emit('server-message', {
        username: 'Server',
        message: `${msg.username} joined the chat!`,
        userCount: activeRooms.filter((room) => room.room === msg.room).length,
        time: new Date().toTimeString().split(" ")[0],
    });
}

module.exports = joinRoomHandler;
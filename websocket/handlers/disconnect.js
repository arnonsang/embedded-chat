const disconnectHandler = (io, socket, activeRooms) => {
    socket.leave(socket.room);
    activeRooms = activeRooms.filter((room) => {
        return room.user !== socket.username;
    });

    io.to(socket.room).emit('server-message', {
        username: 'Server',
        message: `${socket.username} left the chat!`,
        userCount: activeRooms.filter((room) => room.room === socket.room).length,
        time: new Date().toTimeString().split(" ")[0],
    });
}

module.exports = disconnectHandler;
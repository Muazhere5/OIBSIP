const { Server } = require('socket.io');

const configureSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        socket.on('disconnect', () => {
        });
    });

    return io;
};

module.exports = configureSocket;

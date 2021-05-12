const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/message')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')))
io.on('connection',socket => {
        socket.emit('message',formatMessage('Bot','Welcome to Channel'));

        //user connects notification
        socket.broadcast.emit('message',formatMessage('Bot','Someone Joined :]'));
        //user disconnects notification

        socket.on('disconnect',() =>{
                io.emit('message',formatMessage('Bot','Someone died :<'));
        });

        socket.on('chatMessage',(msg) =>{
                io.emit('message',formatMessage('USER',msg));
        });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));

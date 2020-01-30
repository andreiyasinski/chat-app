const express = require('express');
const socketio = require('socket.io');
const http = require('http')

const PORT = process.env.PORT || 5000;

const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom, checkUserName } = require('./users')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`, image: null });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!`, image: null });

    socket.join(user.room);

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message.message, image: message.image });
    //io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    callback();
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has left`, image: null });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
})

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}...`))
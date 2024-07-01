const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

// Object to store messages per room
const rooms = {};

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join room', (room, username) => {
    socket.join(room);
    // Initialize room if not exist
    if (!rooms[room]) {
      rooms[room] = [];
    }

    // Send last 10 messages to user
    socket.emit('init messages', rooms[room]);

    io.to(room).emit('user joined', `${username} joined the room`);

    socket.on('chat message', (msg) => {
      const message = { username, message: msg, timestamp: new Date() };
      rooms[room].push(message);
      // Maintain only the last 10 messages
      if (rooms[room].length > 10) {
        rooms[room].shift(); // Remove the oldest message
      }
      io.to(room).emit('chat message', message);
    });

    socket.on('disconnect', () => {
      io.to(room).emit('user left', `${username} left the room`);
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

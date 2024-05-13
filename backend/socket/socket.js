import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected ', socket.id);

  socket.on('createVideoRoom', ({ roomId }) => {
    socket.join(roomId);
  });
  socket.on('createColabRoom', ({ roomId }) => {
    socket.join(roomId);
  });
  //
  socket.on('broadcastCode', ({ roomId, codes }) => {
    io.to(roomId).emit('newCodes', {
      codes,
    });
  });
  //
  socket.on('disconnect', () => {
    console.log('user disconnect ', socket.id);
  });
});

export { app, io, server };

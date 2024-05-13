//          Common JS syntax
// const express = require("express");
// const dotenv = require("dotenv")
//          Module JS syntax (read more)
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import roomRoutes from './routes/room.routes.js';
import testRoute from './routes/test.route.js';
import connectToMongoDB from './db/connectToMongoDB.js';

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse the incoming reuests with JSON payloads (from req.body)
app.use(cookieParser());

app.use('/',testRoute);
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/room', roomRoutes);

// app.get("/", (req, res) => {
//   // root route http://localhost:5000/
//   res.send("hello world!!!");
// });

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server is running on port ${PORT}`);
});

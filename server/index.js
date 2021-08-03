const express = require("express");
const userRouter = require("./src/routers/userRouter.js");
const cookieParser = require("cookie-parser");
const User = require("./src/models/userModel");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("./src/db/mongoose.js");

// Initializing the server
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

// Core Application middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

// Socket IO middleware
io.use(async (socket, next) => {
  try {
    const token = JSON.parse(socket.handshake.query.userId).token;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    socket.id = decoded.user;
    next();
  } catch (error) {}
});

// Socket connect
io.on("connection", async (socket) => {
  console.log("New user connect with ID: " + socket.id);

  // Get current user object from frontend
  const currentUser = JSON.parse(socket.handshake.query.userId).user;

  // Socket implementations
  require("./src/socketServices/send")(socket, currentUser);
  require("./src/socketServices/getUsersFromDB")(io, socket);

  // On Socket disconnect
  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.id);
  });
});

// Routers
app.use(userRouter);

// Server
const PORT = process.env.PORT || 4000;
http.listen(PORT, () => {
  console.log(
    "Connection success: ",
    `WebSocket is now running on port ${PORT}`
  );
});

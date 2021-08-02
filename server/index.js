const express = require("express");
const userRouter = require("./src/routers/userRouter.js");
const cookieParser = require("cookie-parser");
const User = require("./src/models/userModel");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("./src/db/mongoose.js");
require("./sockets");

// Initializing the server
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

io.use(async (socket, next) => {
  try {
    const token = JSON.parse(socket.handshake.query.userId).token;
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    socket.id = payload.user;
    next();
  } catch (error) {}
});

io.on("connection", async (socket) => {
  console.log("New user connect with ID: " + socket.id);

  const user = JSON.parse(socket.handshake.query.userId).user;
  const { firstName, lastName, email, gender } = user;

  const alert = {
    firstName,
    lastName,
    email,
    gender,
  };

  socket.on("send", (list) => {
    console.log("from the socker", list[0]._id);
    socket.to(list[0]._id).emit("message", alert);
  });

  socket.on("get_users_list_from_db", async () => {
    const usersList = await User.find({});
    io.sockets.emit("store_list_to_state", usersList);
  });
  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });
});

app.use(userRouter);

// PORT DECLARATION
const PORT = process.env.PORT || 4000;

http.listen(PORT, () => {
  console.log(
    "Connection success: ",
    `WebSocket is now running on port ${PORT}`
  );
});

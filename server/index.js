const express = require("express");
const userRouter = require("./src/routers/userRouter.js");
const cookieParser = require("cookie-parser");
const User = require("./src/models/userModel");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("./src/db/mongoose.js");
const fileUpload = require("express-fileupload");

// Initializing the server
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" }, });

// Core Application middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("uploads"));
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(fileUpload());

// [POST] CREATE USER AND ADD TOKEN TO BROWSER
app.post("/users", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const fileURL = req.files.image.name;
  uploadPath = __dirname + "/uploads/" + fileURL;

  req.files.image.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
  });

  const {
    firstName,
    lastName,
    email,
    gender,
    birthday,
    mobile,
    password,
    address,
    lat,
    lng,
  } = req.body;

  const userData = {
    firstName,
    lastName,
    email,
    gender: gender,
    birthday,
    phone: mobile,
    hashedPassword: password,
    location: { address, lat, lng },
    image: fileURL,
  };

  try {
    const user = User(userData);

    await user.save();

    const token = await user.generateAuthToken();
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
      })
      .send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Initialize watch of User model
const changeStream = User.watch();

// Authenticate ever incoming connection for socket
io.use(async (socket, next) => {
  try {
    const token = JSON.parse(socket.handshake.query.token).userData.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    socket.id = decoded.user;
    next();
  } catch (error) {}
});

// Socket connect
io.on("connection", async (socket) => {
  console.log("New user connect with ID: " + socket.id);

  // Inital startup
  const users = await User.find({});
  socket.emit("get_contacts", users);

  // Emit for every change to user collection
  changeStream.on("change", (next) => {
    socket.emit("update_user");
  });

  // Retreive current user from server
  const currentUser = await User.findOne({ _id: socket.id });

  // Sock commands implementations
  require("./src/socketServices/send")(socket, currentUser);
  require("./src/socketServices/sendAlertResponse")(socket, currentUser);
  require("./src/socketServices/storeAlertToDB")(socket, currentUser);

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

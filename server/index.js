const express = require("express");
const userRouter = require("./src/routers/userRouter.js");
const cookieParser = require("cookie-parser");
const User = require("./src/models/userModel");
const fileUpload = require("express-fileupload");
var multipart = require("connect-multiparty");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("./src/db/mongoose.js");
const helmet = require("helmet");

// Initializing the server
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Core Application middleware

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(fileUpload());

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       useDefaults: false,
//       directives: {
//         defaultSrc: ["self"],
//       },
//     },
//   })
// );

app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + "/public/images/" + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.send();
  });
});

// Socket IO middleware
io.use(async (socket, next) => {
  try {
    console.log(
      "SERVER",
      JSON.parse(socket.handshake.query.userData).userData.token
    );
    const token = JSON.parse(socket.handshake.query.userData).userData.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    socket.id = decoded.user;
    next();
  } catch (error) {}
});

// Socket connect
io.on("connection", async (socket) => {
  console.log("New user connect with ID: " + socket.id);

  // Get current user object from frontend
  const currentUser = JSON.parse(socket.handshake.query.userData).userData;

  // // console.log("@@@", currentUser);
  // // Socket implementations
  require("./src/socketServices/send")(socket, currentUser);
  require("./src/socketServices/getUsersFromDB")(io, socket);

  socket.on("STORE_ALERT_TO_DB", async (alert) => {
    const { id, email, firstname, lastname, gender, location } = alert;

    const storedAlert = {
      currentUserId: id,
      email: email,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      address: location,
      viewed: false,
    };

    await User.findOneAndUpdate(
      { _id: currentUser.id },
      { $push: { alerts: { alert: storedAlert } } }
    );

    const user = await User.findOne({ _id: currentUser.id });
    console.log("USERHER", user.alerts.length);

    socket.emit("UPDATE_ALERT", user.alerts);
  });

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

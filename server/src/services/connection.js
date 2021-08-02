// const

// io.on("connection", (socket) => {
//   console.log("New user connect with ID: " + socket.id);

//   socket.on("get_users_list_from_db", async () => {
//     const usersList = await User.find({});
//     io.sockets.emit("store_list_to_state", usersList);
//   });

//   socket.on("send_alert_to_recipient", async (payload) => {
//     console.log("PAYLOAD", payload);
//     const { currentUser, sendList } = payload;
//     const { _id, firstName, lastName, location } = currentUser.data;

//     // Current user data to send with alert
//     const alert = {
//       currentUserId: _id,
//       firstname: firstName,
//       lastname: lastName,
//       location: location,
//     };

//     const user = await User.findOne({ _id: sendList[0]._id });
//     user.alerts = user.alerts.concat({ alert });
//     await user.save();
//   });

//   socket.on("send_alerts", (currentUser) => {});

//   const changeStream = User.watch();

//   changeStream.on("change", (data) => {
//     console.log(data.updateDescription.updatedFields.alerts);
//     socket.emit("send_alert", data.updateDescription.updatedFields.alerts);
//   });
// });

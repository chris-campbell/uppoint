module.exports = function (io, socket, currentUser) {
  socket.on("send", (list) => {
    const { firstName, lastName, email, gender } = currentUser;

    const alert = {
      firstName,
      lastName,
      email,
      gender,
    };

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
};

const User = require("../models/userModel");

// Retrieves Users from the DB
module.exports = (io, client) => {
  client.on("GET_USERS_FROM_DB", async () => {
    const usersList = await User.find({});
    io.sockets.emit("STORE_USER_LIST_TO_MEMORY", usersList);
  });
};

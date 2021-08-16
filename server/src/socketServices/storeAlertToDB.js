const User = require("../models/userModel");

module.exports = (socket, currentUser) => {
  socket.on("store_alert_to_db", async (alertData) => {
    const {
      id,
      email,
      firstName,
      lastName,
      gender,
      location,
      image,
    } = alertData;

    const alert = {
      currentUserId: id,
      email: email,
      firstname: firstName,
      lastname: lastName,
      gender: gender,
      address: location.address,
      image: image,
      viewed: false,
    };

    await User.findOneAndUpdate(
      { _id: currentUser.id },
      { $push: { alerts: { alert } } }
    );
  });
};

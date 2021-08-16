// Handles sending alert to specified socket ID
module.exports = (client, currentUser) => {
  client.on("send", (list) => {
    const {
      id,
      firstName,
      lastName,
      email,
      gender,
      location,
      image,
    } = currentUser;

    const alert = {
      id,
      email,
      firstName,
      lastName,
      gender,
      location,
      image,
    };

    if (!list.length > 0) return console.log("Send list empty");

    list.forEach((user) => {
      client.to(user._id).emit("alert_sender", alert);
    });
  });
};

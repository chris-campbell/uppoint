// Handles sending alert to specified socket ID
module.exports = (client, currentUser) => {
  client.on("send", (list) => {
    const { firstName, lastName, email, gender } = currentUser;

    const alert = {
      firstName,
      lastName,
      email,
      gender,
    };

    if (!list.length > 0) return console.log("Send list empty");

    list.forEach((user) => {
      client.to(user._id).emit("ALERT_MESSAGE", alert);
    });
  });
};

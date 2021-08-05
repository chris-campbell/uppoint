// Handles sending alert to specified socket ID
module.exports = (client, currentUser) => {
  client.on("send", (list) => {
    console.log("SEmD", currentUser);
    const { id, firstname, lastname, email, gender, location } = currentUser;

    const alert = {
      id,
      email,
      firstname,
      lastname,
      gender,
      location,
    };

    if (!list.length > 0) return console.log("Send list empty");

    list.forEach((user) => {
      client.to(user._id).emit("ALERT_MESSAGE", alert);
    });
  });
};

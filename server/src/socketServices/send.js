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

    // If no users in the send list
    if (!list.length > 0) return console.log("Send list empty");

    // Emit alert to each user in send list
    list.forEach((user) => {
      client.to(user._id).emit("alert_sender", alert);
    });
  });
};

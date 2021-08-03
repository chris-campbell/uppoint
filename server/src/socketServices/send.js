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

    console.log("from the socker", list[0]._id);
    client.to(list[0]._id).emit("MESSAGE", alert);
  });
};

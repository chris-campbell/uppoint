const User = require("../models/userModel");

module.exports = (socket, currentUser) => {
  socket.on("send_response", async (recipientData) => {
    const { id, firstName, lastName, email, gender, location, image } = currentUser;

    // Get current user object
    const updateUser = await User.findOne({ _id: id });

    // Get index of alert clicked
    const index = updateUser.alerts.findIndex(
      (alert) => alert.alert._id.toString() === recipientData.alertId.toString()
    );

    // Update the view value
    updateUser.alerts[index].alert.viewed = true;

    // Store in DB
    await updateUser.save();

    const alert = {id, email, firstName, lastName, gender, location, image };

    socket.to(recipientData.identifier).emit("alert_sender", alert);
  });
};

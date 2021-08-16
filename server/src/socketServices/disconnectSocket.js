module.exports = (socket) => {
  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.id);
  });
};

import { newAlertNotification } from "../../../utils/notification";

export const receiveAlert = async (socket, updateCurrentUser) => {
  socket.off("alert_sender").on("alert_sender", async (message) => {
    newAlertNotification(message.firstName);
    socket.emit("store_alert_to_db", message);
    await updateCurrentUser();
  });
}

export const sendAlerts = (socket, sendList) => {
  socket.emit("send", sendList);
};

export const currentUserUpdate = (socket, updateCurrentUser) => {
  socket.on("update_user", async () => {
    await updateCurrentUser();
  });
}

export const getContacts = (socket, setContactList) => {
  socket.on("get_contacts", (list) => {
      setContactList(list);
  });
}


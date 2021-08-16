import { store } from "react-notifications-component";

export const uniqueEmailNotification = () => {
  return store.addNotification({
    title: "Email already exist in the system.",
    message: "Please try another email address",
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export const sendListFullNotification = () => {
  return store.addNotification({
    title: "Send list maxed out.",
    message: "You can only send out 7 alerts at a time",
    type: "warning",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export const allFieldsErrorNotification = (error) => {
  return store.addNotification({
    title: "All fields not filled in",
    message: error,
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export const userAlreadyInListNotification = () => {
  return store.addNotification({
    title: "OOoopps",
    message: "User already in the send list.",
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export const vaildEmailFormatNotification = () => {
  return store.addNotification({
    title: "Invalid Email",
    message: "Please input a valid email address",
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export const addedDetailsNotication = () => {
  return store.addNotification({
    title: "We're almost there",
    message: "Please provide a few more details about yourself!",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export const newAccountNotification = () => {
  return store.addNotification({
    title: "Welcome to upPoint!",
    message: "Your new account was successfully created.",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export const newAlertNotification = (sender) => {
  return store.addNotification({
    title: `New alert from ${sender}.`,
    message: "Alert back to say your okay",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

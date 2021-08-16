import React from "react";
import "./css/AlertCard.css";

function AlertCard({
  firstname,
  lastname,
  identifier,
  socket,
  image,
  address,
  viewed,
  alertId,
}) {
  const responseAlert = () => {
    console.log(socket);
    socket.emit("send_response", { identifier: identifier, alertId: alertId });
  };

  function capFirstChar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const getCity = () => {
    const city = address.split(",")[1].trim();
    const state = address.split(",")[2].trim();

    return city + ", " + state;
  };

  return (
    <article className="card">
      <div className="card-read-wrapper">
        {!viewed ? (
          <div className="card-read-indicator"></div>
        ) : (
          <div
            style={{ display: "none" }}
            className="card-read-indicator"
          ></div>
        )}
      </div>
      <div className="card-wrapper">
        <img src={image} id="avatar-img" />
        <div className="card-title">
          {capFirstChar(firstname)} {capFirstChar(lastname)}
        </div>
        <div className="card-city">{getCity()}</div>

        <button onClick={responseAlert} className="alert-btn">
          Alert
        </button>
      </div>
    </article>
  );
}

export default AlertCard;

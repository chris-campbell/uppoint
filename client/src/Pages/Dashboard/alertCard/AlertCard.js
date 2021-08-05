import React from "react";
import "./css/AlertCard.css";
import Avatar from "./img/profile.png";

function AlertCard({ firstname, lastname }) {
  function capFirstChar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <article className="card">
      <div className="card-read-wrapper">
        <div className="card-read-indicator"></div>
      </div>
      <div className="card-wrapper">
        <img src={Avatar} />
        <div className="card-title">
          {capFirstChar(firstname)} {capFirstChar(lastname)}
        </div>
        <div className="card-distance">12.4 miles</div>
        <button className="alert-btn">Alert</button>
      </div>
    </article>
  );
}

export default AlertCard;

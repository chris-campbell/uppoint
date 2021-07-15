import React from "react";
import "./css/dashboard.css";
import Logo from "./img/logo.svg";
import Bell from "./img/bell.svg";
import Avatar from "./img/profile.png";
import Textfield from "@material-ui/core/TextField";
const Dashboard = () => {
  return (
    <>
      <nav className="dashboard-nav">
        <div class="dashboard-nav__wrapper">
          <img className="logo" src={Logo} />

          <div className="dashboard-nav__notification-icon">
            <img className="dashboard-nav__icon" src={Bell} />
          </div>
          <ul className="dashboard-nav__main-nav">
            <li>
              <img className="avatar" src={Avatar} />
            </li>
            <li className="username">Dennis Bishop</li>
          </ul>
        </div>
      </nav>
      <main className="dash-area">
        <Textfield
          label="e.g. John Smith"
          variant="outlined"
          className="input-item"
        />
      </main>
    </>
  );
};

export default Dashboard;

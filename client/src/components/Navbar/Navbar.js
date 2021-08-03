import React, { useContext } from "react";
import Logo from "./img/logo.svg";
import Bell from "./img/bell.svg";
import Avatar from "./img/profile.png";
import AuthContext from "../../context/AuthContext";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const { getLoggedIn } = useContext(AuthContext);

  const logOut = async () => {
    await axios.get("http://localhost:4000/users/logout");

    await getLoggedIn();

    return <Redirect to="/login" />;
  };

  return (
    <nav className="dashboard-nav">
      <div class="dashboard-nav__wrapper">
        <img className="logo" alt="logo" src={Logo} />

        <div className="dashboard-nav__notification-icon">
          <img
            className="dashboard-nav__icon"
            alt="notification-icon"
            src={Bell}
          />
        </div>
        <ul className="dashboard-nav__main-nav">
          <li>
            <img className="avatar" alt="user-avatar" src={Avatar} />
          </li>
          <li className="username">Dennis Bishop</li>
          <li>
            {/* <button onClick={logOut}>Logout</button> */}
            <Link onClick={logOut} to="/login">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

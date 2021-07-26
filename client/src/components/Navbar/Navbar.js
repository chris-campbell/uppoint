import React, { useContext } from "react";
import Logo from "./img/logo.svg";
import Bell from "./img/bell.svg";
import Avatar from "./img/profile.png";
import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const { getLoggedIn } = useContext(AuthContext);

  const history = useHistory();

  const logOut = async () => {
    await axios.get("http://localhost:4000/users/logout");

    await getLoggedIn();

    history.push("/login");
  };

  return (
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
          <li>
            <button onClick={logOut}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

import React, { useContext, useEffect, useState } from "react";
import Logo from "./img/logo.svg";
import Bell from "./img/bell.svg";
import Avatar from "./img/profile.png";
import AuthContext from "../../context/AuthContext";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import "./css/Navbar.css";

function Navbar() {
  const { getLoggedIn } = useContext(AuthContext);
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    await updateCurrentUser();
    setIsLoading(false);
  }, []);

  const updateCurrentUser = async () => {
    const userData = await axios.get("/currentUser");
    setUser(userData);
  };

  function capFirstChar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const logOut = async () => {
    await axios.get("http://localhost:4000/users/logout");

    await getLoggedIn();

    return <Redirect to="/login" />;
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <nav className="dashboard-nav">
      <div class="dashboard-nav__wrapper">
        <img className="logo" alt="logo" src={Logo} />

        <div className="dashboard-nav__notification-icon">
          <div class="notify">
            <img
              className="dashboard-nav__icon"
              alt="notification-icon"
              src={Bell}
            />
            <div className="notification-count">{user.data.alerts.length}</div>
          </div>
        </div>
        <ul className="dashboard-nav__main-nav">
          <li>
            <div class="dropdown">
              <img
                className="avatar btn btn-secondary dropdown-toggle"
                alt="user-avatar"
                src={user.data.image}
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              />
              {console.log(user.data.image)}
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <Link className="dropdown-item" onClick={logOut} to="/login">
                  Logout
                </Link>
              </div>
            </div>
          </li>
          <li className="username">{capFirstChar(user.data.firstName)}</li>
          <li className="logout"></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

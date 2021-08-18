import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import Logo from "./img/logo.svg";
import "./css/login.css";
import "./css/materialForm.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const { getLoggedIn, loggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (loggedIn) {
      history.push("/dashboard");
    }
  });

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const userCred = {
        email: email,
        password: password,
      };

      const userObj = await axios.post(
        "http://localhost:4000/users/login",
        userCred,
        {
          withCredentials: true,
        }
      );

      const userData = {
        token: userObj.data.token,
      };

      // Store user object to local storage
      localStorage.setItem("user", JSON.stringify({ userData }));
      getLoggedIn();
      history.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <img alt="logo" src={Logo} className="login-logo" />
        <form className="login-form">
          <input
            className="text-field"
            type="email"
            placeholder="example@domain.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-field"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={loginUser}>
            Submit
          </button>
        </form>

        <p className="register-user">
          Not Registered, sign up{" "}
          <Link className="register-link" to="/">
            here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useContext } from "react";

import { useHistory } from "react-router";
import axios from "axios";
import "./css/materialForm.css";
import Logo from "./img/logo.svg";
import "./css/login.css";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);

  let history = useHistory();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const userCred = {
        email: email,
        password: password,
      };

      await axios.post("/users/login", userCred, {
        withCredentials: true,
      });

      // if (!user) {
      //   return console.log("No such users in system!");
      // }

      getLoggedIn();
      history.push({
        pathname: "/dashboard",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <img src={Logo} className="login__logo" />

        <form className="login__form">
          <label class="pure-material-textfield-outlined">
            <input onChange={(e) => setEmail(e.target.value)} />
            <span>Email</span>
          </label>

          <label class="pure-material-textfield-outlined">
            <input onChange={(e) => setPassword(e.target.value)} />
            <span>Password</span>
          </label>
          <button onClick={loginUser}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import Logo from "./img/logo.svg";
import "./css/login.css";
import "./css/materialForm.css";

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

      // Store user object to local storage
      localStorage.setItem("user", JSON.stringify(userObj.data));
      getLoggedIn();
      history.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <img alt="logo" src={Logo} className="login__logo" />

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

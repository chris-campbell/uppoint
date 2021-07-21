import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./css/materialForm.css";
import Logo from "./img/logo.svg";
import "./css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = localStorage;
    console.log(user);
  }, []);

  let history = useHistory();

  const loginUser = async (e) => {
    e.preventDefault();

    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    try {
      const response = await fetch("/users/login", headers);
      console.log(response);
      const user = await response.json();

      if (!user) {
        return console.log("No such users in system!");
      }

      history.push({
        pathname: "/dashboard",
      });
    } catch (error) {
      console.log(error);
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

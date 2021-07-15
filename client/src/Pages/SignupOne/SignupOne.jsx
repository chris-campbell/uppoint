import React, { useState } from "react";
import Textfield from "@material-ui/core/TextField";
import "./css/signup_one.scss";
import Logo from "./img/logo.svg";
import GoogleIcon from "./img/google_icon.svg";
import { Link } from "react-router-dom";
import validator from "validator";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import { useHistory } from "react-router-dom";

const SignupOne = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  let history = useHistory();

  const emailUnique = async () => {
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    };

    if (!validator.isEmail(email)) {
      setEmail("");
      document.getElementById("email-text-field").value = "";
      const s = store.addNotification({
        title: "Invalid Email",
        message: "Please input a valid email address",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });

      return console.log("Invalid Email format");
    }

    try {
      const response = await fetch("/users/check", headers);
      const data = await response.json();

      if (data === false) {
        return store.addNotification({
          title: "Email already exist in the system.",
          message: "Please try another email address",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }

      history.push({
        pathname: "/signup-details",
        state: { first: firstName, last: lastName, email },
      });

      console.log("Return", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidateEmail = async () => {
    if (validator.isEmail(email)) {
      console.log("valid result: ", validator.isEmail(email));
      return true;
    }
    console.log("valid result: ", validator.isEmail(email));
    return false;
  };

  const isFieldsEmpty = () => {
    if (firstName === "" || lastName === "" || email === "") {
      return false;
    }

    console.log("From the end", true);
    return true;
  };

  return (
    <div className="join">
      <ReactNotification />
      <div className="join__wrapper">
        <div className="join__split">
          <div className="join__signup">
            <img src={Logo} />
            <div class="join__signup-copy-wrapper">
              <h1>Join the search!</h1>
              <p>
                Proin egestas erat vel magna ornare finibus. Sed sed tristique
                leo, consectetur fringilla turpis.
              </p>
              <button className="join__signin-btn">Sign in</button>
            </div>
          </div>
          <div className="join__create-account">
            <div class="join__create-wrapper">
              <h1>Create an account</h1>
              <div className="join__google-btn">
                <div
                  onClick={() => isValidateEmail()}
                  class="google-icon-wrapper"
                >
                  <img src={GoogleIcon} />
                  <span>Sign in with Google</span>
                </div>
              </div>
              <p>or use your email to sign up</p>
              <form className="join__signup-form">
                <Textfield
                  label="First name"
                  variant="outlined"
                  className="join__input-item"
                  onChange={handleFirstNameChange}
                />
                <Textfield
                  label="Last name"
                  variant="outlined"
                  className="join__input-item"
                  onChange={handleLastNameChange}
                />
                <Textfield
                  label="Email"
                  variant="outlined"
                  className="join__input-item"
                  id="email-text-field"
                  onChange={handleEmailChange}
                />
                {isFieldsEmpty() ? (
                  <Link to="/">
                    <button
                      className="join__submit-btn"
                      onClick={() => emailUnique()}
                    >
                      Continue
                    </button>
                  </Link>
                ) : (
                  <button className="join__disable-btn" disabled="l">
                    Continue
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupOne;

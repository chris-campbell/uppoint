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
import {
  uniqueEmailNotification,
  vaildEmailFormatNotification,
  addedDetailsNotication,
} from "./notification";

const SignupOne = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
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

    //Performs check of email formatting
    if (!validator.isEmail(email)) {
      setEmail("");
      document.getElementById("email-text-field").value = "";
      return vaildEmailFormatNotification();
    }

    try {
      // Check is email is unique in MongoDB
      const response = await fetch("/users/check", headers);
      const isUnique = await response.json();

      if (!isUnique) {
        return uniqueEmailNotification();
      }

      // routes user to next page is all is valid
      history.push({
        pathname: "/signup-details",
        state: { firstname, lastname, email },
      });
      addedDetailsNotication();
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

  // Checks email is in a valid format
  const isValidateEmail = async () => {
    if (validator.isEmail(email)) {
      console.log("valid result: ", validator.isEmail(email));
      return true;
    }
    console.log("valid result: ", validator.isEmail(email));
    return false;
  };

  // Check if all form field have a value
  const isFieldsEmpty = () => {
    if (firstname === "" || lastname === "" || email === "") {
      return false;
    }
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

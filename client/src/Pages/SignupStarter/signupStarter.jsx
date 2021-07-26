import React, { useContext, useState } from "react";
import Textfield from "@material-ui/core/TextField";
import "./css/signup_one.scss";
import Logo from "./img/logo.svg";
import GoogleIcon from "./img/google_icon.svg";
import { Link } from "react-router-dom";
import validator from "validator";
import ReactNotification from "react-notifications-component";
import { useHistory } from "react-router-dom";
import {
  uniqueEmailNotification,
  vaildEmailFormatNotification,
  addedDetailsNotication,
} from "./notification";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const SignupStarter = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { getLoggedIn } = useContext(AuthContext);

  let history = useHistory();

  const emailUnique = async () => {
    if (!validator.isEmail(email)) {
      setEmail("");
      document.getElementById("email-text-field").value = "";
      return vaildEmailFormatNotification();
    }

    const userEmailData = { email: email };

    try {
      const isUnique = await axios.post(
        "/users/checkEmailUnique",
        userEmailData
      );

      if (!isUnique.data) {
        return uniqueEmailNotification();
      }

      history.push({
        pathname: "/signup-details",
        state: { firstname, lastname, email },
      });

      getLoggedIn();
      addedDetailsNotication();
    } catch (err) {
      console.error(err);
    }
  };

  const isValidateEmail = () => {
    if (validator.isEmail(email)) {
      return true;
    }

    return false;
  };

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
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Textfield
                  label="Last name"
                  variant="outlined"
                  className="join__input-item"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Textfield
                  label="Email"
                  variant="outlined"
                  className="join__input-item"
                  id="email-text-field"
                  onChange={(e) => setEmail(e.target.value)}
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

export default SignupStarter;

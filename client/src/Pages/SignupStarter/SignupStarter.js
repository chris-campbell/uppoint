import React, { useContext, useState, useEffect } from "react";
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
} from "./js/notification";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const SignupStarter = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (loggedIn) {
      history.push("/dashboard");
    }
  });

  const { getLoggedIn, loggedIn } = useContext(AuthContext);

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

  const isFieldsEmpty = () => {
    if (firstname === "" || lastname === "" || email === "") {
      return false;
    }
    return true;
  };

  return (
    <div className="signup">
      <ReactNotification />
      <div className="signup-wrapper">
        <div className="two-split">
          <div className="login-section">
            <img alt="logo" src={Logo} />
            <div class="login-copy-wrapper">
              <h1 className="login-section-title">Join the search!</h1>
              <p class="login-section-desc">
                Proin egestas erat vel magna ornare finibus. Sed sed tristique
                leo, consectetur fringilla turpis.
              </p>
              <Link to="/login">
                <button className="send-to-login-btn">Sign in</button>
              </Link>
            </div>
          </div>
          <div className="register-section">
            <div class="register-wrapper">
              <h1 className="register-title">Create an account</h1>

              <form className="signup-form">
                <Textfield
                  placeholder="First name"
                  variant="outlined"
                  className="input-item"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Textfield
                  placeholder="Last name"
                  variant="outlined"
                  className="input-item"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Textfield
                  placeholder="Email"
                  variant="outlined"
                  className="input-item"
                  id="email-text-field"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {isFieldsEmpty() ? (
                  <Link to="/">
                    <button
                      className="submit-btn"
                      onClick={() => emailUnique()}
                    >
                      Continue
                    </button>
                  </Link>
                ) : (
                  <button className="disable-btn" disabled="l">
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

import React, { useState } from "react";
import Textfield from "@material-ui/core/TextField";
import "./css/signup_one.scss";
import Logo from "./img/logo.svg";
import GoogleIcon from "./img/google_icon.svg";
import { Link } from "react-router-dom";
import validator from "validator";

const creatUser = async () => {
  const d = new Date(2018, 11, 24, 10);
  const response = await fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: "Random3",
      lastName: "Person3",
      email: "random3@gmail.com",
      password: "upsdown7",
      gender: "female",
      birthday: d,
      phone: "7184629373",
      location: "1 Madison meth street",
    }),
  });

  const myJson = await response.json();
  console.log(myJson);
};

const SignupOne = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidateEmail = (email) => {
    if (!validator.isEmail(email)) {
      return false;
    }
    return true;
  };

  const isFieldsEmpty = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      !isValidateEmail(email)
    ) {
      return false;
    }

    return true;
  };

  return (
    <div className="join">
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
              <button onClick={() => creatUser()} className="join__signin-btn">
                Sign in
              </button>
            </div>
          </div>
          <div className="join__create-account">
            <div class="join__create-wrapper">
              <h1>Create an account</h1>
              <div className="join__google-btn">
                <div onClick={() => test()} class="google-icon-wrapper">
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
                  onChange={handleEmailChange}
                />
                {!isFieldsEmpty() ? (
                  <button className="join__disable-btn" disabled="l">
                    Continue
                  </button>
                ) : (
                  <Link
                    to={{
                      pathname: "/signup-details",
                      state: {
                        first: firstName,
                        last: lastName,
                        e: email,
                      },
                    }}
                    className="join__link"
                  >
                    <button
                      className="join__submit-btn active-btn"
                      type="submit"
                      value="Sign up"
                    >
                      Continue
                    </button>
                  </Link>
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

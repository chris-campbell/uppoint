import React, { useState } from "react";
import Avatar from "./img/avatar.svg";
import Textfield from "@material-ui/core/TextField";
import PhoneInput from "react-phone-number-input";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import "./css/signup_two.scss";

const SignupTwo = (props) => {
  const [birthday, setBirthday] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const creatUser = async () => {
    const d = new Date(2018, 11, 24, 10);
    await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: props.location.state.first,
        lastName: props.location.state.last,
        email: props.location.state.e,
        password: password,
        gender: "female",
        birthday: d,
        phone: mobile,
        location: location,
      }),
    });
    history.push("/dashboard");
  };
  const handleDateOFBirth = (e) => {
    console.log(birthday);
    setBirthday(e.target.value);
  };

  const handleMobileNumber = (e) => {
    setMobile(e.target.value);
  };

  const handlelocation = (e) => {
    setLocation(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="signup-two">
      <div className="signup-two__wrapper">
        <div className="signup-two__split">
          <div className="signup-two__additional-details">
            <div className="signup-two__additional-details-wrapper">
              <h1 className="signup-two__title">Additional Details</h1>
              <div className="signup-two__male-container">
                <div className="signup-two__btn">
                  <label>Gender</label>
                  <div class="signup-two__gender-option">
                    <div className="signup-two__icon-container">
                      <svg
                        className="male-icon"
                        data-name="male-icon"
                        enable-background="new 0 0 512 512"
                        height="512"
                        viewBox="0 0 512 512"
                        width="512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <path d="m276.956 0v57.674h136.589l-101.389 101.389c-32.544-24.144-72.837-38.431-116.471-38.431-108.074 0-195.685 87.61-195.685 195.684 0 108.073 87.611 195.684 195.684 195.684s195.684-87.611 195.684-195.684c0-43.634-14.287-83.928-38.431-116.472l101.389-101.388v136.589h57.674v-235.045zm-81.272 447.552c-72.48 0-131.237-58.757-131.237-131.237s58.757-131.237 131.237-131.237 131.237 58.757 131.237 131.237c0 72.481-58.757 131.237-131.237 131.237z" />
                        </g>
                      </svg>
                    </div>
                    <span className="male-label">Male</span>
                    <div className="signup-two__icon-container">
                      <svg
                        className="female-icon"
                        data-name="female-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 277.36 477.14"
                      >
                        <path
                          d="M326.71,342H262.08V277.36a18.81,18.81,0,0,0-.21-2c65.41-11.12,115.38-68.16,115.38-136.68C377.25,62.21,315,0,238.57,0S99.89,62.21,99.89,138.68c0,68.52,50,125.56,115.38,136.68-.06.67-.21,1.31-.21,2V342H150.43a23.51,23.51,0,0,0,0,47h64.64v64.64a23.51,23.51,0,0,0,47,0V389h64.63a23.51,23.51,0,1,0,0-47ZM146.9,138.68a91.68,91.68,0,1,1,91.67,91.67A91.78,91.78,0,0,1,146.9,138.68Z"
                          transform="translate(-99.89 0)"
                        />
                      </svg>
                    </div>
                    <span className="female-label">Female</span>
                    <div className="signup-two__icon-container">
                      <div className="other-icon"></div>
                    </div>
                    <span className="other-label">Other</span>
                  </div>
                </div>
                <form class="form">
                  <div className="signup-two__birthday details-input">
                    <label>Date of Birth</label>
                    <Textfield
                      label="12/22/1985"
                      variant="outlined"
                      className="input-item"
                      onChange={handleDateOFBirth}
                    />
                  </div>
                  <div className="signup-two__mobile details-input">
                    <label>Mobile</label>
                    <Textfield
                      label="718 555 5555"
                      variant="outlined"
                      className="input-item"
                      onChange={handleMobileNumber}
                    />
                  </div>
                  <div className="signup-two__location details-input">
                    <label>Location</label>
                    <Textfield
                      label="1 Fake street"
                      variant="outlined"
                      className="input-item"
                      onChange={handlelocation}
                    />
                  </div>
                  <div className="signup-two__image details-input">
                    <label>Image</label>
                    <Textfield
                      label="Select image"
                      variant="outlined"
                      className="input-item"
                    />
                  </div>
                  <div className="signup-two__password details-input">
                    <label>Password</label>
                    <Textfield
                      label="Password"
                      variant="outlined"
                      className="input-item"
                      onChange={handlePassword}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="signup-two__copy">
            <div class="signup-two__copy-wrapper">
              <img src={Avatar} />
              <h3>Provide some details about yourself</h3>
              <p>
                Fusce vitae iaculis lorem, eu sodales metus. Sed pellentesque
                nunc non ipsum aliquet volutpat a a leo. Nunc porttitor tellus
                justo
              </p>
            </div>
            <button
              onClick={creatUser}
              className="signup-two__finish-btn active-btn"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupTwo;

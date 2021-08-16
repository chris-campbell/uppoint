import React, { useEffect, useState, useContext } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import NumberFormat from "react-number-format";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Textfield from "@material-ui/core/TextField";
import AuthContext from "../../context/AuthContext";

import { newAccountNotification } from "../signupStarter/js/notification";
import "./css/materialForm.css";
import "./css/signup_two.scss";
import Avatar from "./img/avatar.svg";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import axios from "axios";
import GenderRadioButton from "../../components/GenderRadioButton/GenderRadioButton";

const SignupFinish = (props) => {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  // useEffect(() => {
  //   if (loggedIn) {
  //     history.push("/dashboard");
  //   }
  // });

  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());
  const [coordinates, setCoordinates] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [image, setImage] = useState({});

  let location = useLocation();
  let history = useHistory();

  console.log(location.state);

  useEffect(() => {
    if (location.state) {
      setFirstName(location.state.firstname);
      setLastName(location.state.lastname);
      setEmailAddress(location.state.email);
    }
  }, [location]);

  const handleSelect = async (value) => {
    const geo = await geocodeByAddress(value);
    const latlng = await getLatLng(geo[0]);

    setCoordinates(latlng);
    setAddress(value);
  };

  const handleChange = (e) => {
    console.log(e.target.files);

    let file = e.target.files[0];
    setImage(file);
  };

  const createUser = async (e) => {
    e.preventDefault();

    // let userData = {
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: emailAddress,
    //   hashedPassword: password,
    //   gender: gender,
    //   birthday: selectedDate,
    //   phone: mobile,
    //   location: {
    //     address: address,
    //     lat: coordinates.lat,
    //     lng: coordinates.lng,
    //   },
    // };

    // const userObj = await axios.post("http://localhost:4000/users", userData, {
    //   withCredentials: true,
    // });

    // // if (!userObj) {
    // //   return console.log("invalid result");
    // // }

    const image = document.querySelector("#image");

    const userFormData = new FormData();

    userFormData.append("firstName", firstName);
    userFormData.append("lastName", lastName);
    userFormData.append("email", emailAddress);
    userFormData.append("gender", gender);
    userFormData.append("birthday", selectedDate);
    userFormData.append("mobile", mobile);
    userFormData.append("address", address);
    userFormData.append("lat", coordinates.lat);
    userFormData.append("lng", coordinates.lng);
    userFormData.append("password", password);
    if (image.files[0]) {
      userFormData.append("image", image.files[0]);
    }

    const userObj = await axios.post(
      "http://localhost:4000/users",
      userFormData
    );

    console.log(userObj);

    const userData = {
      token: userObj.data.token,
    };

    localStorage.setItem("user", JSON.stringify({ userData }));
    getLoggedIn();
    history.push("/dashboard");
    newAccountNotification();
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="signup-two">
        <ReactNotification />
        <div className="signup-two__wrapper">
          <div className="signup-two__split">
            <div className="signup-two__additional-details">
              <div className="signup-two__additional-details-wrapper">
                <h2 className="signup-two__sub-title">
                  {/* Hey {firstName.charAt(0).toUpperCase() + firstName.slice(1)}, */}
                </h2>
                <h1 className="signup-two__title">Add Details</h1>
                <form
                  // action="http://localhost:4000/users"
                  // method="post"
                  onSubmit={createUser}
                  class="form"
                  id="createUser"
                  enctype="multipart/form-data"
                >
                  <div className="signup-two__male-container">
                    <div className="signup-two__btn">
                      <label>Gender</label>
                      <div class="signup-two__gender-option">
                        <label>
                          Male
                          <GenderRadioButton
                            gender="male"
                            onChange={(e) => setGender(e.target.value)}
                          />
                        </label>
                        <label>
                          Female
                          <GenderRadioButton
                            gender="female"
                            onChange={(e) => setGender(e.target.value)}
                          />
                        </label>
                        <label>
                          Other
                          <GenderRadioButton
                            gender="other"
                            onChange={(e) => setGender(e.target.value)}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="signup-two__birthday details-input">
                      <label>Date of Birth</label>
                      <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Date of birth"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={(date) => handleDateChange(date)}
                        name="birthday"
                      />
                    </div>
                    <div className="signup-two__mobile details-input">
                      <label>Mobile</label>
                      <NumberFormat
                        customInput={Textfield}
                        variant="outlined"
                        label="718 555 5555"
                        format="### ###-####"
                        className="input-item"
                        mask=" "
                        name="mobile"
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                    <div className="signup-two__location details-input">
                      <label>Location</label>
                      <PlacesAutocomplete
                        value={address}
                        onChange={setAddress}
                        onSelect={handleSelect}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => (
                          <div className="location-input">
                            <label class="pure-material-textfield-outlined">
                              <input
                                {...getInputProps({ placeholder: "" })}
                                name="location"
                              />
                              <span>Enter location</span>
                            </label>
                            <div>
                              {loading ? <div>...loading</div> : null}
                              {suggestions.map((suggestion) => {
                                const style = {
                                  backgroundColor: suggestion.active
                                    ? "#41b6e6"
                                    : "#fff",
                                };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      style,
                                    })}
                                  >
                                    {suggestion.description}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>
                    </div>

                    <div className="signup-two__password details-input">
                      <label>Password</label>
                      <Textfield
                        label="Password"
                        variant="outlined"
                        type="password"
                        className="input-item"
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                      />
                    </div>
                    <div className="signup-two__avatar details-input">
                      <label>Upload avatar</label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </div>
                    <button className="signup-two__finish-btn active-btn">
                      Finish
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="signup-two__copy">
              <div class="signup-two__copy-wrapper">
                <img alt="push-icon" src={Avatar} />
                <h3>Provide some details about yourself</h3>
                <p>
                  Fusce vitae iaculis lorem, eu sodales metus. Sed pellentesque
                  nunc non ipsum aliquet volutpat a a leo. Nunc porttitor tellus
                  justo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default SignupFinish;

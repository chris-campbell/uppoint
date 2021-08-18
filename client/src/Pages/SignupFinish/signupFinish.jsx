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
import GenderRadioButton from "./components/genderRadioButton/GenderRadioButton";

const SignupFinish = (props) => {
  const { getLoggedIn } = useContext(AuthContext);

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

  const createUser = async (e) => {
    e.preventDefault();

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
        <div className="signup-two-wrapper">
          <div className="page-split">
            <div className="signup-two-copy-section">
              <div class="signup-two-copy-wrapper">
                <img className="copy-icon" alt="push-icon" src={Avatar} />
                <h3 className="copy-title">
                  Provide some details about yourself
                </h3>
                <p className="copy-desc">
                  Fusce vitae iaculis lorem, eu sodales metus. Sed pellentesque
                  nunc non ipsum aliquet volutpat a a leo. Nunc porttitor tellus
                  justo
                </p>
              </div>
            </div>
            <div className="additional-details-section">
              <div className="additional-details-wrapper">
                <h1 className="additional-details-title">Add Details</h1>
                <form
                  onSubmit={createUser}
                  class="additional-details-form"
                  id="createUser"
                  enctype="multipart/form-data"
                >
                  <div className="select-gender-container">
                    <div className="gender-radio-selectors">
                      <label>Gender</label>
                      <div class="gender-options">
                        <label>
                          <span className="label-right">Male</span>
                          <GenderRadioButton
                            gender="male"
                            onChange={(e) => setGender(e.target.value)}
                          />
                        </label>
                        <label>
                          <span className="label-right">Female</span>
                          <GenderRadioButton
                            gender="female"
                            onChange={(e) => setGender(e.target.value)}
                          />
                        </label>
                        <label>
                          <span className="label-right">Other</span>
                          <GenderRadioButton
                            gender="other"
                            onChange={(e) => setGender(e.target.value)}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="details-input">
                      <label>Date of Birth</label>
                      <KeyboardDatePicker
                        inputVariant="outlined"
                        format="MM/dd/yyyy"
                        placeholder="Date of birth"
                        value={selectedDate}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={(date) => handleDateChange(date)}
                        name="birthday"
                      />
                    </div>
                    <div className="details-input">
                      <label>Mobile</label>
                      <NumberFormat
                        name="mobile"
                        className="input-item"
                        placeholder="718 555 5555"
                        format="### ### ####"
                        variant="outlined"
                        mask=" "
                        customInput={Textfield}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                    <div className="details-input">
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
                            <Textfield
                              {...getInputProps({
                                placeholder: "",
                              })}
                              name="location"
                              variant="outlined"
                              placeholder="1 New York Plaza, FDR Drive, New York, NY"
                            />

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

                    <div className="details-input">
                      <label>Password</label>
                      <Textfield
                        variant="outlined"
                        type="password"
                        placeholder="password"
                        className="input-item"
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                      />
                    </div>
                    <div className="details-input">
                      <label>Upload avatar</label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </div>
                    <button className="finish-btn active-btn">Finish</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default SignupFinish;

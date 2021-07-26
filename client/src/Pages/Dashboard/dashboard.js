import React, { useState, useRef, useEffect, useContext } from "react";
import ReactNotification from "react-notifications-component";
import CurrentUserContext from "../../context/CurrentUserContext";
import AuthContext from "../../context/AuthContext";
import { getLocationPromise } from "./js/coordinates.js";
import "./css/dashboard.css";
import "./css/materialForm.css";
import haversine from "haversine";
import axios from "axios";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [sendList, setSendList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentUserLocation, setCurrentUserLocation] = useState({});

  // Function to get user current logged in status
  const { getLoggedIn } = useContext(AuthContext);
  const { currentUser } = useContext(CurrentUserContext);

  /**
   * Current user
   * Get CurrentUser object to use on DOM
   */
  useEffect(async () => {
    const response = await axios.get("/currentUser");
    // setCurrentUser(response.data);
  }, []);

  /**
   * User Collection
   * Retrieves list of users from MongoDB collection
   * Used to provide provide user suggestions to form
   */
  useEffect(async () => {
    const users = await axios.get("http://localhost:3000/users");
    setContacts(users.data);
  }, []);

  /**
   * Retreive Coordinate and set to state
   */
  useEffect(async () => {
    const coords = await getLocationPromise;
    setCurrentUserLocation(coords);
    getLoggedIn();
  }, []);

  /**
   * Function Send
   * Sends a list of users to server to send alerts to
   */
  const sendAlerts = async () => {
    const response = await axios.post("http://localhost:4000/send", sendList);
    console.log(response.data);
  };

  /**
   * Iterates currentUsers alerts and display them via li
   * elements.
   */
  const renderAlerts = () => {
    if (currentUser.data)
      return currentUser.data.alerts.map((alert, i) => {
        console.log(alert.firstname);
        return <li key={i}>{alert.alert.firstname}</li>;
      });
  };

  // Adds clicked user to send list
  const getUser = (e) => {
    const userId = e.currentTarget.getAttribute("data-id");

    // Gets user from fetched list retrieved from DB
    const user = contacts.filter((user) => user._id === userId);
    const sendUsers = sendList.filter((user) => user._id === userId);

    // Check if user already in send list
    if (sendUsers.length === 0) {
      setSendList((sendList) => [...sendList, user[0]]);
      return setSearchTerm(
        `${user[0].firstName} ${user[0].lastName} - ${user[0].location.address}`
      );
    }

    console.log("User already in alert list (replace with alert");
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        Object.values(contact);
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  // Get distance between two users
  const distanceBetween = (user) => {
    const { latitude, longitude } = currentUserLocation;

    const searchedUserCoords = {
      latitude: user.location.lat,
      longitude: user.location.lng,
    };

    const currentUserCoords = {
      latitude: latitude,
      longitude: longitude,
    };

    return haversine(currentUserCoords, searchedUserCoords, {
      unit: "mile",
    });
  };

  const suggestions = () => {
    return searchResults.map((result) => (
      <li
        data-id={result._id}
        key={result._id}
        onClick={(e) => getUser(e)}
        className="user-result-"
      >
        {`${result.firstName} ${result.lastName}  ${distanceBetween(result)
          .toFixed(1)
          .toString()} miles `}
      </li>
    ));
  };

  const getSearchTerm = () => {
    searchHandler(inputElement.current.value);
  };

  const inputElement = useRef("");

  return (
    <>
      <main className="dash-area">
        <ReactNotification />
        <ul>
          {sendList.map((user) => (
            <li>
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>

        <label class="pure-material-textfield-outlined">
          <input
            id="search"
            ref={inputElement}
            // className="input-item"
            value={searchTerm}
            onChange={getSearchTerm}
          />
          <span>Enter location</span>
        </label>

        <div>
          <ul>
            {searchResults.length > 0 ? (
              suggestions()
            ) : (
              <li>No matches available</li>
            )}
          </ul>
        </div>
        <button onClick={sendAlerts} id="btn">
          Test
        </button>
        <div>
          <ul>{!currentUser ? "...loading" : renderAlerts()}</ul>
        </div>
      </main>
    </>
  );
};

export default Dashboard;

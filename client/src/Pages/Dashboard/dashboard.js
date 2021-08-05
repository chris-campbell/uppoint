import React, { useState, useRef, useEffect, useContext } from "react";
import ReactNotification from "react-notifications-component";
import AuthContext from "../../context/AuthContext";
import haversine from "haversine";
import SocketContext from "../../context/Socket";
import { getLocationPromise } from "./js/coordinates.js";
import "./css/dashboard.css";
import "./css/materialForm.css";
import AlertCard from "./alertCard/AlertCard";
import axios from "axios";
import { newAlertNotification } from "../signupStarter/js/notification";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [sendList, setSendList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentUserLocation, setCurrentUserLocation] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [alertMessage, setAlertMessage] = useState({});

  // Function to get user current logged in status
  const { getLoggedIn } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  // Get users list and store to memory
  useEffect(() => {
    socket.emit("GET_USERS_FROM_DB");
    socket.on("STORE_USER_LIST_TO_MEMORY", async (userList) => {
      setUsers(userList);
    });
  }, []);

  // Manage bidirectional messages
  useEffect(() => {
    socket.on("ALERT_MESSAGE", (message) => {
      setAlertMessage(message.firstname);
      if (message.firstname !== alertMessage) {
        newAlertNotification(message.firstname);
      }

      socket.emit("STORE_ALERT_TO_DB", message);
    });
  }, []);

  useEffect(() => {
    if (alerts.length <= 0) loadList();

    socket.on("UPDATE_ALERT", (list) => {
      setAlerts([...list]);
    });
  }, []);

  const loadList = async () => {
    const user = await axios.get("http://localhost:4000/getAlerts");
    setAlerts(user.data);
  };

  useEffect(async () => {
    const coords = await getLocationPromise;
    setCurrentUserLocation(coords);
    await getLoggedIn();
  }, []);

  // Render alerts in DOM
  const renderAlerts = () => {
    if (alerts.length > 0) {
      return alerts
        .filter((alert) => alert.alert.viewed === false)
        .map((alert, i) => {
          const { firstname, lastname } = alert.alert;
          return <AlertCard firstname={firstname} lastname={lastname} />;
        });
    }
  };

  // Sends a list of users to server to send alerts to
  const sendAlerts = () => {
    socket.emit("send", sendList);
  };

  // Adds clicked user to send list
  const addToSendList = (e) => {
    const userId = e.currentTarget.getAttribute("data-id");

    // Gets user from fetched list retrieved from DB
    const user = users.filter((user) => user._id === userId);

    const sendUsers = sendList.filter((user) => user._id === userId);

    // Check if user already in send list
    if (sendUsers.length === 0) {
      setSendList((sendList) => [...sendList, user[0]]);
      return setSearchTerm(
        `${user[0].firstName} ${user[0].lastName} - ${user[0].location.address}`
      );
    }

    // console.log("User already in alert list (replace with alert");
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm !== "") {
      const newContactList = users.filter((contact) => {
        Object.values(contact);
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(users);
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
        onClick={(e) => addToSendList(e)}
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
      <ReactNotification />
      <main className="dash-area">
        <ul>
          {sendList.map((user) => (
            <li>
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
        <button onClick={sendAlerts} id="btn">
          Test
        </button>

        <label id="search" class="pure-material-textfield-outlined">
          <input
            ref={inputElement}
            value={searchTerm}
            onChange={getSearchTerm}
          />
          <span>e.g. john smith</span>
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

        <section>
          <ul className="alerts-area">
            {alerts.length > 0 ? renderAlerts() : "...loading"}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Dashboard;

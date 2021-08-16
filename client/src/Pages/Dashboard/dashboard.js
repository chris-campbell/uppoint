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
import {
  newAlertNotification,
  userAlreadyInListNotification,
  sendListFullNotification,
} from "../../utils/notification";
import Pagination from "../../components/Pagination";
import { UserContext } from "../../context/UserContext";
import Sender from "./img/sender.svg";
import Spinner from "./img/spinner.svg";
import { capFirstChar } from '../../utils/commons';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [sendList, setSendList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentUserLocation, setCurrentUserLocation] = useState({});
  const [alertMessage, setAlertMessage] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [alertsPerPage] = useState(8);
  const [showSuggestionArea, setShowSuggestionArea] = useState(false);


  // Function to get user current logged in status
  const { getLoggedIn } = useContext(AuthContext);
  const { user, setUser } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  
  const inputElement = useRef("");
  const suggestionBox = useRef("");

  useEffect(async () => {
    await updateCurrentUser();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    socket.on("update_user", async () => {
      await updateCurrentUser();
    });
  }, []);

  useEffect(() => {
    socket.on("send_contacts", (list) => {
      setUsers(list);
    });
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!suggestionBox.current.contains(event.target)) {
        if (suggestionBox.current.style.display === "block") {
          suggestionBox.current.style.display = "none";
          inputElement.current.value = "";
        }
      }
    });
  }, []);

  // Manage bidirectional message
  useEffect(async () => {
    socket.off("alert_sender").on("alert_sender", async (message) => {
      newAlertNotification(message.firstName);
      setAlertMessage(message.firstName);
      socket.emit("store_alert_to_db", message);
      await updateCurrentUser();
    });
  }, []);

  useEffect(async () => {
    const coords = await getLocationPromise;
    setCurrentUserLocation(coords);
    await getLoggedIn();
  }, []);

  const updateCurrentUser = async () => {
    const userData = await axios.get("/currentUser");
    setUser(userData);
  };

  // Sends a list of users to server to send alerts to
  const sendAlerts = () => {
    socket.emit("send", sendList);
  };

  const recieveAlert = async () => {

  }

  // Adds clicked user to send list
  const addToSendList = (e) => {
    const userId = e.currentTarget.getAttribute("data-id");

    // Gets user from fetched list retrieved from DB
    const user = users.filter((user) => user._id === userId);

    const sendUsers = sendList.filter((user) => user._id === userId);

    // Check if user already in send list
    if (sendUsers.length === 0) {
      console.log(sendUsers.length);

      if (sendList.length === 7) {
        return sendListFullNotification();
      }

      setSendList((sendList) => [...sendList, user[0]]);

      return setSearchTerm(
        `${capFirstChar(user[0].firstName)} ${capFirstChar(user[0].lastName)}`
      );
    }

    userAlreadyInListNotification();
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
      setShowSuggestionArea(true);
    } else {
      setSearchResults([]);
      setShowSuggestionArea(false);
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
    return searchResults.map((suggestion) => (
      <li
        data-id={suggestion._id}
        key={suggestion._id}
        onClick={(e) => addToSendList(e)}
        className="user-result"
      >
        <img className="send-avatar-icon" src={suggestion.image} />
        <div class="suggestion-items">
          <span className="suggestion-name">
            {`${capFirstChar(suggestion.firstName)} ${capFirstChar(
              suggestion.lastName
            )}`}
          </span>
          <span className="suggestion-distance">
            {`${distanceBetween(suggestion).toFixed(1).toString()} miles `}
          </span>
        </div>
      </li>
    ));
  };

  if (isLoading) {
    return (
      <div class="spinner-container"><img src={Spinner} /></div>
    );
  }

  const getSearchTerm = () => {
    searchHandler(inputElement.current.value);
  };

  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = user.data.alerts.slice(indexOfFirstAlert, indexOfLastAlert);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render alerts in DOM
  const renderAlerts = () => {
    if (currentAlerts.length > 0) {
      return currentAlerts.map((alert, i) => {
        const { _id, currentUserId, firstname, lastname, address, image, viewed } = alert.alert;

        return (
          <AlertCard
            key={i}
            alertId={_id}
            firstname={firstname}
            lastname={lastname}
            image={image}
            viewed={viewed}
            address={address}
            identifier={currentUserId}
            socket={socket}
          />
        );
      });
    }
  };

  return (
    <>
      <ReactNotification />
      <main className="dash-area">
        <div className="send-console">
          <span className="send-list-count">
            {sendList.length} people in send queue
          </span>
          <img onClick={sendAlerts} id="send-btn" src={Sender} />
          <ul className="send-list-render">
            {sendList.map((user) => (
              <li className="send-user">
                <img src={user.image} className="send-avatar" />
              </li>
            ))}
          </ul>
        </div>

        <form id="sender-form">
          <input
            id="sender-suggestion"
            ref={inputElement}
            value={searchTerm}
            placeholder="Type a name..."
            onChange={() => getSearchTerm()}
          />
        </form>

        <div className="contact-suggestion-list">
          {searchResults.length > 0 ? (
            <ul
              id="suggestions"
              ref={suggestionBox}
              style={{ display: "block" }}
            >
              {suggestions()}
            </ul>
          ) : (
            <ul
              id="suggestions"
              ref={suggestionBox}
              style={{ display: "none" }}
            ></ul>
          )}
        </div>

        <section>
          {user.data.alerts.length > 0 ? (
            <ul className="alerts-area">{renderAlerts()}</ul>
          ) : (
            <p>Sorry, no new alerts yet.</p>
          )}
        </section>

        <Pagination
          alertsPerPage={alertsPerPage}
          totalAlerts={user.data.alerts.length}
          paginate={paginate}
        />
      </main>
    </>
  );
};

export default Dashboard;

import React, { useState, useRef, useEffect, useContext } from "react";
import ReactNotification from "react-notifications-component";
import AuthContext from "../../context/AuthContext";
import SocketContext from "../../context/Socket";
import AlertCard from "./components/alertCard/AlertCard";
import Suggestion from "./components/suggestion/Suggestion";
import Pagination from "./components/pagination/Pagination";
import axios from "axios";
import { getLocationPromise } from "./js/coordinates.js";
import {
  userAlreadyInListNotification,
  sendListFullNotification,
} from "../../utils/notification";
import { UserContext } from "../../context/UserContext";
import { capFirstChar } from "../../utils/commons";
import {
  receiveAlert,
  sendAlerts,
  currentUserUpdate,
  getContacts,
} from "./js/socketCommands";
import Sender from "./img/sender.svg";
import Spinner from "./img/spinner.svg";
import "./css/dashboard.css";
import UserAvatar from "./components/userAvatar/UserAvatar";
import SuggestionInput from "./components/suggestionInput/SuggestionInput";
import SpinnerLoader from "./components/spinner/Spinner";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [sendList, setSendList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentUserLocation, setCurrentUserLocation] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [alertsPerPage] = useState(8);
  const [showSuggestionArea, setShowSuggestionArea] = useState(false);

  // Function to get user current logged in status
  const { getLoggedIn } = useContext(AuthContext);
  const { user, setUser } = useContext(UserContext);
  const { socket } = useContext(SocketContext);

  const inputElement = useRef("");
  const suggestionBox = useRef("");
  const ele = document.getElementById("suggestions");

  useEffect(() => {
    // Set initial user context state
    (async () => {
      await updateCurrentUser();
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    // Update user context state when new change to users DB
    currentUserUpdate(socket, updateCurrentUser);
  }, []);

  // Manage bidirectional message
  useEffect(() => {
    receiveAlert(socket, updateCurrentUser);
  }, []);

  useEffect(() => {
    // Set users contact list will  available contact from DB
    getContacts(socket, setContactList);
  }, []);

  const setContactList = (list) => {
    setUsers(list);
  };

  useEffect(() => {
    // Hide input suggestion box when clicked outside element

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    const userLocation = async () => {
      const coords = await getLocationPromise;
      setCurrentUserLocation(coords);
      await getLoggedIn();
    };

    userLocation();
  }, []);

  let handler = (event) => {
    if (!suggestionBox.current.contains(event.target)) {
      if (suggestionBox.current.style.display === "block") {
        suggestionBox.current.style.display = "none";
        inputElement.current.value = "";
      }
    }
  };

  // Get currentUser value from server
  const updateCurrentUser = async () => {
    const userData = await axios.get("/currentUser");
    // Set to user context state
    setUser(userData);
  };

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

  // Filters contacts to display in suggestions
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

  // Suggested contact list
  const suggestions = () => {
    return searchResults.map((suggestion) => (
      <Suggestion
        suggestion={suggestion}
        addToSendList={addToSendList}
        currentUserLocation={currentUserLocation}
      />
    ));
  };

  if (isLoading) {
    return <SpinnerLoader image={Spinner} />;
  }

  const getSearchTerm = () => {
    searchHandler(inputElement.current.value);
  };

  // Pagination
  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = user.data.alerts.slice(
    indexOfFirstAlert,
    indexOfLastAlert
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render alerts in DOM
  const renderAlerts = () => {
    if (currentAlerts.length > 0) {
      return currentAlerts.map((alert, i) => {
        const {
          _id,
          currentUserId,
          firstname,
          lastname,
          address,
          image,
          viewed,
        } = alert.alert;

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
      <main className="dashboard">
        <div className="send-console">
          <span className="send-list-count">
            {sendList.length} people in send queue
          </span>
          <img
            onClick={() => sendAlerts(socket, sendList)}
            id="send-btn"
            src={Sender}
          />
          <ul className="send-list-render">
            {sendList.map((user) => (
              <UserAvatar image={user.image} />
            ))}
          </ul>
        </div>

        <form id="sender-form">
          <SuggestionInput
            inputElement={inputElement}
            searchTerm={searchTerm}
            getSearchTerm={getSearchTerm}
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

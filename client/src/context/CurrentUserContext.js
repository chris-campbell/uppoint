import axios from "axios";
import React, { useState, useEffect, createContext } from "react";

const CurrentUserContext = createContext();

const CurrentUserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});

  const getCurrentUser = async () => {
    const userObj = await axios.get("/currentUser");
    setCurrentUser(userObj);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, getCurrentUser }}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
export { CurrentUserContextProvider };

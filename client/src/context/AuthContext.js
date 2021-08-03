import axios from "axios";
import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {
    const loggedInStatus = await axios.get("/loggedIn");
    // console.log(loggedInStatus);
    console.log("AUTHCONTEXT", loggedInStatus.data);
    setLoggedIn(loggedInStatus.data);
  }

  useEffect(async () => {
    await getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };

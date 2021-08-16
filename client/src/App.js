import React, { useState, useEffect, useMemo } from "react";
import { SocketContextProvider } from "./context/Socket";
import axios from "axios";
import Router from "./Router";
import { UserContext } from "./context/UserContext";

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState([]);

  // useEffect(async () => {
  //   try {
  //     const user = await axios.get("http://localhost:4000/currentUser");
  //     setUser(user);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={providerValue}>
      <Router />
    </UserContext.Provider>
  );
}

export default App;

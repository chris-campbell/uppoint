import React from "react";
import { SocketContextProvider } from "./context/Socket";
import axios from "axios";
import Router from "./Router";

axios.defaults.withCredentials = true;

function App() {
  return (
    <SocketContextProvider>
      <Router />
    </SocketContextProvider>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import { AuthContextProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { SocketContextProvider } from "./context/Socket";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

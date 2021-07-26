import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import { CurrentUserContextProvider } from "./context/CurrentUserContext";
import Router from "./Router";

axios.defaults.withCredentials = true;
function App() {
  return (
    <AuthContextProvider>
      <CurrentUserContextProvider>
        <Router />
      </CurrentUserContextProvider>
    </AuthContextProvider>
  );
}

export default App;

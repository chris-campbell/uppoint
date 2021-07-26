import React, { useState, useEffect } from "react";
// import SignupOne from "./Pages/SignupStarter/signupStarter";
// import SignupTwo from "./Pages/SignupFinish/signupFinish";
// import Dashboard from "./Pages/Dashboard/dashboard";
import Login from "./Pages/Login/login";
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

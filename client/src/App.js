import React, { useState, useEffect } from "react";
import SignupOne from "./Pages/SignupOne/SignupOne";
import SignupTwo from "./Pages/SignupTwo/signupTwo";
import Dashboard from "./Pages/Dashboard/dashboard";
import Login from "./Pages/Login/login";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={SignupOne} />
          <Route path="/signup-details" component={SignupTwo} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

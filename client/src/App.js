import React, { useState, useEffect } from "react";
import SignupOne from "./Pages/SignupOne/SignupOne";
import SignupTwo from "./Pages/SignupTwo/signupTwo";
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
        {/* <Join /> */}

        <Switch>
          <Route path="/" exact component={SignupOne} />
          <Route path="/signup-details" component={SignupTwo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

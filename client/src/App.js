import React, { useState, useEffect } from "react";
import Join from "./components/Join/join";
import Details from "./components/Details/details";
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
          <Route path="/" exact component={Join} />
          <Route path="/signup-details" component={Details} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

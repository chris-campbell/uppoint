import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AuthContext from "./context/AuthContext";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/login";
import SignupFinish from "./Pages/SignupFinish/signupFinish";
import SignupStarter from "./Pages/SignupStarter/signupStarter";
import AuthRoutes from "./components/AuthRoutes";

const Router = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Navbar />

      <Switch>
        <>
          {console.log("LOGGEDIN", loggedIn)}
          {loggedIn && (
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
          )}
          <AuthRoutes
            exact
            path="/"
            auth={loggedIn}
            component={SignupStarter}
          />
          <AuthRoutes
            exact
            path="/signup-details"
            auth={loggedIn}
            component={SignupFinish}
          />
          <AuthRoutes exact path="/login" auth={loggedIn} component={Login} />
        </>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

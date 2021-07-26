import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AuthContext from "./context/AuthContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import SignupFinish from "./pages/SignupFinish/SignupFinish";
import SignupStarter from "./pages/SignupStarter/SignupStarter";
import AuthRoutes from "./components/auth/AuthRoutes";

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

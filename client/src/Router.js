import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AuthContext from "./context/AuthContext";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import SignupFinish from "./pages/signupFinish/SignupFinish";
import SignupStarter from "./pages/signupStarter/SignupStarter";
import AuthRoutes from "./components/auth/AuthRoutes";
import NotFound404 from "./pages/404/NotFound404";
import { UserContext } from "./context/UserContext";
const Router = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {loggedIn && <Navbar />}

      <Switch>
        <Route exact path="/">
          <SignupStarter />
        </Route>
        <Route path="/signup-details">
          <SignupFinish />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
        <AuthRoutes path="/dashboard">
          <Dashboard />
        </AuthRoutes>
        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

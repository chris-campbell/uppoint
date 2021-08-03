import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const AuthRoutes = ({ children, ...rest }) => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoutes;

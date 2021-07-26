import React from "react";
import { Redirect, Route } from "react-router-dom";

const AuthRoutes = ({ component: Component, auth, ...rest }) => {
  console.log(auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(auth);
        // Load Auth Component if not loggedIn
        if (!auth) return <Component {...rest} {...props} />;

        return (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default AuthRoutes;

import React from "react";
import { Redirect, Route } from "react-router-dom";

const OpenRoutes = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        // Load Auth Component if not loggedIn
        console.log("AUTHROUTES", auth);
        if (auth === true) return <Component {...rest} {...props} />;

        return (
          <Redirect
            to={{
              pathname: "/",
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

export default OpenRoutes;

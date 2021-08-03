import React from "react";
import { useLocation } from "react-router-dom";

function NotFound404() {
  let location = useLocation();

  return (
    <div>
      <p>
        No match for <code>{location.pathname}</code>
      </p>
    </div>
  );
}

export default NotFound404;

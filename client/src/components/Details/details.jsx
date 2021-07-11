import React from "react";

const Details = (props) => {
  return (
    <>
      <h1>{props.location.state.first}</h1>
      <h1>{props.location.state.last}</h1>
      <h1>{props.location.state.e}</h1>
      <h1>{props.location.state.password}</h1>
    </>
  );
};

export default Details;

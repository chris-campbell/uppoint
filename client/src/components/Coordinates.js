import React from "react";
import { geolocated } from "react-geolocated";

const Demo = () => {
  return !this.props.isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !this.props.isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : this.props.coords ? (
    this.props.coords.latitude
  ) : (
    <div>Getting the location data&hellip; </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Demo);

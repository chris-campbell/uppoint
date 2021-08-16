import React from "react";

function GenderRadioButton({ gender, onChange }) {
  return (
    <input
      id={gender}
      type="radio"
      name="gender"
      value={gender}
      onChange={onChange}
    />
  );
}

export default GenderRadioButton;

import React, { useState } from "react";

const Alert = ({ message, onAlert }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAlert = () => {
    setIsVisible(false);
    onAlert();
  };

  return isVisible ? (
    <div className="alert">
      <p>{message}</p>
      <button onClick={handleAlert}>OK</button>
    </div>
  ) : null;
};

export default Alert;

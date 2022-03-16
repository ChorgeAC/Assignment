import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div>
      <div className="logoContainer">
        <div>
          <img src="https://delta.exchange/logo.svg" alt="logo" />
        </div>
        <div>
          <button className="HeaderBtn">Sign Up</button>
          <button className="HeaderBtn">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Header;

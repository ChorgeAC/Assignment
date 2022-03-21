import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

const Header = ({ hashidenAuthButtons }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");
  };

  return (
    <div>
      <div className="logoContainer">
        <div>
          <img src="https://delta.exchange/logo.svg" alt="logo" />
        </div>
        {username ? (
          <div className="headerProfile">
            <img src="/avatar.png" alt="profile" style={{ height: "2rem" }} />
            <div style={{ padding: "0 1rem" }}>{username}</div>
            <button className="HeaderBtn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : hashidenAuthButtons ? (
          <div>
            <button className="HeaderBtn" onClick={() => navigate("/")}>
              Home
            </button>
          </div>
        ) : (
          <div>
            <button className="HeaderBtn" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
            <button className="HeaderBtn" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

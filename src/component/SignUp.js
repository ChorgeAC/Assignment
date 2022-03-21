import React, { useState, useEffect } from "react";
import "./sign.css";
import Header from "./Header";
import axios from "axios";
import { config } from "../App";
import { persistLogin } from "./login";
import { useNavigate } from "react-router-dom";

const defaultRegister = {
  username: "",
  password: "",
  email: "",
};
const SignUp = () => {
  const [formdata, setformdata] = useState(defaultRegister);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const name = e.target.name;
    setformdata({ ...formdata, [name]: e.target.value });
  };

  const isValidate = (data) => {
    if (data.username === "") {
      alert("enter username");
      return false;
    }
    if (data.email === "") {
      alert("enter email");
      return false;
    }
    if (data.password === "") {
      alert("enter password");
      return false;
    }
    return true;
  };

  const register = async (data) => {
    if (isValidate(data)) {
      try {
        const res = await axios.post(`${config.endpoint}/auth/register`, {
          username: data.username,
          email: data.email,
          password: data.password,
        });
        setformdata(defaultRegister);
        login(data.username, data.password);
        navigate("/");
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };

  const login = async (username, password) => {
    try {
      const res = await axios.post(`${config.endpoint}/auth/login`, {
        username: username,
        password: password,
      });
      persistLogin(res.data.token, res.data.username);
      window.location.reload();
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <>
      <Header hashidenAuthButtons={true} />
      <div className="container">
        <div>
          <h2 style={{ color: "purple", padding: "0.5rem" }}>Register</h2>
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formdata.username}
            onChange={onChangeHandler}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formdata.email}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formdata.password}
            onChange={onChangeHandler}
          />
          <button
            type="submit"
            className="btn"
            onClick={() => register(formdata)}
          >
            Sign Up
          </button>
        </div>
        <div>
          <span>Already have an account?</span>
          <button className="btn_primary">Login here</button>
        </div>
      </div>
    </>
  );
};

export default SignUp;

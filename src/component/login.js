import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import { config } from "../App";

const defaultLogin = {
  username: "",
  password: "",
};

export const persistLogin = (token, username) => {
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
};

const Login = () => {
  const [logindata, setLogindata] = useState(defaultLogin);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const name = e.target.name;
    setLogindata({ ...logindata, [name]: e.target.value });
  };

  const isValidate = (data) => {
    if (data.username === "") {
      alert("enter username");
      return false;
    }
    if (data.password === "") {
      alert("enter password");
      return false;
    }
    return true;
  };

  const login = async (data) => {
    if (isValidate(data)) {
      try {
        const res = await axios.post(`${config.endpoint}/auth/login`, {
          username: data.username,
          password: data.password,
        });
        setLogindata(defaultLogin);
        alert("succsess");
        persistLogin(res.data.token, res.data.username);
        navigate("/");
        window.location.reload();
      } catch (error) {
        console.log("Error");
      }
    }
  };

  return (
    <>
      <Header hashidenAuthButtons={true} />
      <div className="container">
        <div>
          <h2 style={{ color: "purple", padding: "0.5rem" }}>Login</h2>
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={logindata.username}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={logindata.password}
            onChange={onChangeHandler}
          />
          <button
            type="submit"
            className="btn"
            onClick={() => login(logindata)}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};
export default Login;

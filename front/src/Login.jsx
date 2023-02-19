import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

function Login() {
  const [host, setHost] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("host:", host, "token:", token);
    navigate("/main");
  };

  return (
    <div className="login-box">
      <div className="overlay"></div>
      <form onSubmit={handleSubmit}>
        <img
          src="https://user-images.githubusercontent.com/113777043/219549506-7b28466e-5cf0-434f-a16f-a61fc0b9f171.png"
          alt="Logo"
        />
        <h1>Welcome to KURI</h1>
        <h2>Sign in</h2>
        <div className="input-box">
          <label>
            <span></span>
            <input
              type="host"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="Enter your host info"
              required
            />
          </label>
        </div>
        <div className="input-box">
          <label>
            <span></span>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your token"
              required
            />
          </label>
        </div>
        <div className="button-container">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          <button type="submit" onClick={handleSubmit}>
            Guest
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

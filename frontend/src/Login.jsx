import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import Cookies from "js-cookie";

function Login() {
  const [host, setHost] = useState("");
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onLoginSuccess = () => {
    navigate("/main");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // check if host and token are valid
    if (host.trim() === "" || token.trim() === "") {
      setErrorMessage("Invalid input. Please enter a valid host and token.");
      return;
    }

    // make API call to check if host and token are correct
    try {
      //const response = await fetch("/login", {
      // Backend Server (localhost:8081)
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          host: host,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const data = await response.json();
      console.log(data)
      // Handle the response data
      // ...
  
    } catch (error) {
      setErrorMessage("Failed to login. Please try again.");
      console.error(error);
    }

    // Set Cookies (host, token)
    Cookies.set("host", host, { expires: 1 }); // save host information to cookie for 1 day
    Cookies.set("token", token, { expires: 1 }); // save token information to cookie for 1 day
    onLoginSuccess();
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
          <button type="submit">Submit</button>
          <button type="submit" onClick={() => navigate("/main")}>
            Guest
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

import React from 'react'

import "./Login.css"
import {useState} from "react";
import {backendUrl} from "../../constants.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login function in your React component
  const handleLogin = async () => {
    const response = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token);
      window.location.href = "/me";
    } else {
      console.log("Login failed");
      window.alert("No user found with that email and password");
    }
  };

  const gotoPassword = (e) => {
    document.getElementsByName("password")[0].focus();
  };
  return (
    <div id="login" className="flex-col">
      <h1>Login</h1>
      <div className="form">
        <div className="subform">
          <label id="email">
            Email:
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              name="email"
              autoComplete="on"
              placeholder="Your Email"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  gotoPassword(e);
                }
              }}
            />
          </label>
        </div>

        <div className="subform">
          <label id="password">
            Password:
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              name="password"
              placeholder="Your Password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
            />
          </label>
        </div>

        <button
          type="submit"
          id="test"
          onClick={handleLogin}
          className="login-button"
        >
          Login
        </button>
        <div className="signup-link">
          <p>Don't have an account?</p>
          <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login ;
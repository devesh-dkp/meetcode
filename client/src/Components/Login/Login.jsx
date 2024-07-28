import React from 'react'
import { useToast } from "@chakra-ui/react";
import "./Login.css";
import { useState } from "react";
import { backendUrl } from "../../constants.js";

const Login = () => {
  const toast = useToast();
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
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const gotoPassword = (e) => {
    if (email === "") {
      toast({
        title: "Email is empty",
        description: "Please enter your email",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      document.getElementsByName("email")[0].focus();
      return;
    }
    e.preventDefault();
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
};

export default Login ;
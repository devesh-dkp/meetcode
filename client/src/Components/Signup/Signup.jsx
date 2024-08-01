import React, { useState } from "react";
import "./Signup.css";
import { backendUrl } from "../../constants.js";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    const response = await fetch(`${backendUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username }),
    });

    if (response.ok) {
      window.location.href = "/login";
    } else {
      alert("Signup failed");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    const passwordInput = document.getElementsByName("password")[0];
    passwordInput.type = showPassword ? "password" : "text";
  };

  return (
    <>
      <div id="signup" className="flex-col">
        <h1>Create an account</h1>
        <div className="signup-form">
          <div className="subform">
            <label id="username">Username: </label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              name="username"
              placeholder="Your Username"
              autoComplete="username"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  document.getElementsByName("email")[0].focus();
                }
              }}
            />
          </div>

          <div className="subform">
            <label id="email">Email: </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              autoComplete="email"
              name="email"
              placeholder="Your Email"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  document.getElementsByName("password")[0].focus();
                }
              }}
            />
          </div>

          <div className="subform">
            <label id="password">Password: </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Your Password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  document.getElementById("submit").click();
                }
              }}
            />
            <div className="show-password">
              <input
                type="checkbox"
                id="show-password"
                onClick={handleShowPassword}
              />
              <label>Show Password</label>
            </div>
          </div>

          <button
            type="submit"
            className="signup-button"
            onClick={handleSignup}
            id="submit"
          >
            SIGNUP
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;

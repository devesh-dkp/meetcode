import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";

import "./Navbar.css";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);

  const handlelogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };
  return (
    <div id="navbar-main" className="flex-row">
      <Link to={"/"}>
        <div className="logo-box flex-row">
          <img
            className="logo"
            src="https://user-images.githubusercontent.com/63964149/152531278-5e01909d-0c2e-412a-8acc-4a06863c244d.png"
            alt="logo"
          />
          <p>MeetCode</p>
        </div>
      </Link>
      <div className="nav-options">
        <Link to={"/problemset/all/"}>Problems</Link>
      </div>
      <div className="nav-options">
        <Link to={"/signup"}>Signup</Link>
      </div>
      {loggedIn ? (
        <div className="nav-options">
          <Link to={"/"} onClick={handlelogout}>
            Logout
          </Link>
        </div>
      ) : (
        <div className="nav-options">
          <Link to={"/login"}>Login</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar

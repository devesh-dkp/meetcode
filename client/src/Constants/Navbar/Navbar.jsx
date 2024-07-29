import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import "./Navbar.css";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      margin="auto"
      marginTop={0}
    >
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        width="74%"
      >
        <Flex p={1}>
          <Link to={"/"}>
            <Flex flexDirection="row" alignItems="center">
              <img
                className="logo"
                src="https://as2.ftcdn.net/jpg/01/97/70/75/480_F_197707519_OxI29fnD4mDRGO0EQdnoAJGTtzlvjaly.png?token=1723475624_09JHL8XrhoNbwwJbrMe96qFz8IyX4yzyOr-7BWFurDM"
                alt="logo"
              />
              <Text>MeetCode</Text>
            </Flex>
          </Link>
        </Flex>
        <Flex
          flexDirection="row"
          alignItems="center"
          fontFamily={"sans-serif"}
          textDecorationLine={"underline"}
        >
          {loggedIn ? (
            <Link to={"/me"}>
              <div color={"black"} fontSize={16}>
                Profile
              </div>
            </Link>
          ) : (
            <Link to={"/login"}>
              <Text color={"black"} fontSize={16}>
                Login
              </Text>
            </Link>
          )}
          <div className="vertical-line"></div>
          {loggedIn ? (
            <Link to={"/"}>
              <div
                color={"black"}
                fontSize={16}
                onClick={() => {
                  handleLogout();
                }}
                ml={0}
              >
                Logout
              </div>
            </Link>
          ) : (
            <Link to={"/signup"}>
              <Text color={"black"} fontSize={16}>
                Signup
              </Text>
            </Link>
          )}
        </Flex>
      </Flex>
      <div id="navbar-main" className="flex-row">
        <div className="nav-options">
          <Link to={"/"}>Home</Link>
        </div>
        <div className="nav-options">
          <Link to={"/problemset/all/"}>Problems</Link>
        </div>
        <div className="nav-options">
          <Link to={"/users"}>Users</Link>
        </div>
        {/* <div className="nav-options">
        <Link to={"/signup"}>Signup</Link>
      </div> */}
      </div>
    </Flex>
  );
};

export default Navbar;
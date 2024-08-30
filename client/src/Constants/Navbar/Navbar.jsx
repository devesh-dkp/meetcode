import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import {
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import "./Navbar.css";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

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
      className="navbar"
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
                src="https://logo.clearbit.com/meetcode.com"
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
              <div fontSize={16}>Profile</div>
            </Link>
          ) : (
            <Link to={"/login"}>
              <Text fontSize={16}>Login</Text>
            </Link>
          )}
          <div className="vertical-line"></div>
          {loggedIn ? (
            <Link to={"/"}>
              <div
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
              <Text fontSize={16}>Signup</Text>
            </Link>
          )}
          <Flex
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            margin="auto"
            mr={0}
            ml={2}
          >
            <IconButton
              icon={<SwitchIcon />}
              isRound="true"
              size="md"
              ml={2}
              onClick={toggleColorMode}
              aria-label="Toggle theme"
            />
          </Flex>
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
        <div className="nav-options">
          <Link to={"/discuss"}>Discuss</Link>
        </div>
      </div>
    </Flex>
  );
};

export default Navbar;
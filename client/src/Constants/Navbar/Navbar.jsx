import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";

import "./Navbar.css";

// const Navbar = () => {
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       setLoggedIn(true);
//     }
//   }, []);
//   return (
//     <div id="navbar-main" className="flex-row">
//       <Link to={"/"}>
//         <div className="logo-box flex-row">
//           <img
//             className="logo"
//             src="https://user-images.githubusercontent.com/63964149/152531278-5e01909d-0c2e-412a-8acc-4a06863c244d.png"
//             alt="logo"
//           />
//           <p>MeetCode</p>
//         </div>
//       </Link>
//       <div className="nav-options">
//         <Link to={"/problemset/all/"}>Problems</Link>
//       </div>
//       <div className="nav-options">
//         <Link to={"/users"}>Users</Link>
//       </div>
//       {/* <div className="nav-options">
//         <Link to={"/signup"}>Signup</Link>
//       </div> */}
//       {loggedIn ? (
//         <div className="nav-options login">
//           <Link to={"/me"}>Profile</Link>
//         </div>
//       ) : (
//         <div className="nav-options login">
//           <Link to={"/login"}>Login</Link>
//         </div>
//       )}
//     </div>
//   );
// };

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
        width="1100px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex p={1}>
          <Link to={"/"}>
            <Flex flexDirection="row" alignItems="center">
              <img
                className="logo"
                src="https://user-images.githubusercontent.com/63964149/152531278-5e01909d-0c2e-412a-8acc-4a06863c244d.png"
                alt="logo"
              />
              <Text>MeetCode</Text>
            </Flex>
          </Link>
        </Flex>
        <Flex>
          {loggedIn ? (
            <Link to={"/me"}>
              <Button
                color={"black"}
                backgroundColor="white"
                fontSize={16}
                mt={0}
                mr={0}
              >
                Profile
              </Button>
            </Link>
          ) : (
            <Link to={"/login"}>
              <Button
                color={"black"}
                fontSize={16}
                backgroundColor="white"
                mt={0}
                mr={0}
              >
                Login
              </Button>
            </Link>
          )}
          <div className="vertical-line"></div>
          {loggedIn ? (
            <Link to={"/"}>
              <Button
                color={"black"}
                backgroundColor="white"
                fontSize={16}
                mt={0}
                onClick={() => {
                  handleLogout();
                }}
                ml={0}
              >
                Logout
              </Button>
            </Link>
          ) : (
            <Link to={"/signup"}>
              <Button
                color={"black"}
                fontSize={16}
                backgroundColor="white"
                mt={0}
                ml={0}
              >
                Signup
              </Button>
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
import React, { useEffect, useState } from "react";
import { Text, Flex } from "@chakra-ui/react";
import Footer from "../../Constants/Footer/Footer.jsx";
import { backendUrl } from "../../constants.js";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch(`${backendUrl}/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setUser(json.user);
      } else {
        console.log("Error fetching user profile");
      }
    };

    init();
  }, []);

  return (
    <div>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={5}
        margin={5}
        marginTop={10}
        border={"1px solid #CBD5E0"}
        borderRadius={5}
        width={["90%", "80%", "40%", "60%"]}
        align={"center"}
        marginX="auto"
      >
        <Text fontSize="3xl">Profile</Text>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          margin="auto"
          marginTop={0}
        >
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            margin="auto"
            marginTop={0}
          >
            <Text fontSize="xl">Username: {user.username}</Text>
            <Text fontSize="xl">Email: {user.email}</Text>
            <Text fontSize="xl">Role: {user.role}</Text>
          </Flex>
        </Flex>
      </Flex>

      <Footer />
    </div>
  );
}

export default Profile;

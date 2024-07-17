import React, { useEffect, useState } from "react";
import "./Profile.css";
import Footer from "../../Constants/Footer/Footer.jsx";
import { backendUrl } from "../../constants.js";
import { Link } from "react-router-dom";
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.replace("/login");
  };

  return (
    <div>
      <div className="profile-container">
        {user ? (
          <div className="profile">
            <div className="user-account">
              <h1>Profile</h1>
              <div>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </div>
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="other-account">
              <p>Other Account</p>
              <button onClick={handleLogout}>Login</button>
            </div>
          </div>
        ) : (
          <>
            <h1>Not logged in</h1>
            <button>
              <Link to={"/login"}>Login</Link>
            </button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;

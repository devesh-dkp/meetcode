import React, { useEffect, useState } from "react";
import "./UsersList.css";
import { backendUrl } from "../../constants.js";
function UsersList() {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const resp = await fetch(`${backendUrl}/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (resp.ok) {
          const json = await resp.json();
          setIsAdmin(json.user.role === "admin");
        }
      }

      const response = await fetch(`${backendUrl}/users`, {});

      if (response.ok) {
        const json = await response.json();
        setUsers(json.users);
      } else {
        console.log("Error fetching users");
      }
    };

    fetchUsers();
  }, []);
  const handleDeleteUser = (userId) => {
    const token = localStorage.getItem("token");
    fetch(`${backendUrl}/user/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        console.log("Error deleting user");
      }
    });
  };
  return (
    <div>
      <h1>Users List</h1>
      <ul className="users-list">
        <li className="header">
          <div className="user">
            <div>Username</div>
            <div>Email</div>
            <div>Role</div>
            {isAdmin && <div>Action</div>}
          </div>
        </li>
        {users.map((user) => (
          <li key={user.id} className="user">
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>{user.role}</div>
            {isAdmin && (
              <div className="action">
                {user.role !== "admin" && (
                  <button onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;

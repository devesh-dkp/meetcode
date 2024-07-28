import { BrowserRouter , Routes , Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./Components/HomePage/HomePage";
import AllProblems from "./Components/AllProblems/AllProblems";

import Navbar from "./Constants/Navbar/Navbar";
import ProblemsPage from "./Components/ProblemsPage/ProblemsPage";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import "./App.css";
import Profile from "./Components/Profile/Profile";
import UsersList from "./Components/Profile/UsersList";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [idleTimeout, setIdleTimeout] = useState(null);

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(idleTimeout);
      setIdleTimeout(
        setTimeout(() => {
          // Perform logout actions
          localStorage.removeItem("token");
          setLoggedIn(false);
        }, 86400000)
      ); // 1 day
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("scroll", resetTimer);

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      clearTimeout(idleTimeout);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/problemset/all/" element={<AllProblems />} />
        <Route path="/problems/:pid/" element={<ProblemsPage />} />
        <Route path="/me" element={loggedIn ? <Profile /> : <Login />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
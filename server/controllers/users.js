const usersRouter = require("express").Router();
const { auth, adminAuth } = require("../middleware");
const jwt = require("jsonwebtoken");
const USERS = require("../models/user");

let USER_ID_COUNTER = 5;
const JWT_SECRET = process.env.JWT_SECRET;

usersRouter.post("/signup", (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  if (USERS.find((user) => user.email === email)) {
    return res.status(403).json({ msg: "Email already exists" });
  }

  USERS.push({
    email,
    password,
    username,
    id: email + USER_ID_COUNTER++ + username,
    role: "user",
  });
  return res.json({ msg: "Success" });
});

usersRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  const user = USERS.find((user) => user.email === email);

  if (!user) {
    return res.status(403).json({ msg: "User not found" });
  }

  if (user.password !== password) {
    return res.status(403).json({ msg: "Incorrect password" });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  return res.json({ token });
});

usersRouter.get("/me", auth, (req, res) => {
  const user = USERS.find((user) => user.id === req.user.id);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  return res.json({ user });
});

// New route to list all users
usersRouter.get("/users", (req, res) => {
  return res.json({ users: USERS });
});

// New route to delete a user
usersRouter.delete("/user/:id", adminAuth, (req, res) => {
  const id = parseInt(req.params.id);
  const index = USERS.findIndex((user) => user.id === id);
  if (index === -1) {
    console.log("User not found");
    return res.status(404).json({ msg: "User not found" });
  }
  USERS.splice(index, 1);
  return res.json({ msg: "Success" });
});

module.exports = usersRouter;

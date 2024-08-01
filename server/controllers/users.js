const usersRouter = require("express").Router();
const { auth, adminAuth } = require("../middleware");
const jwt = require("jsonwebtoken");
const db = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET;

usersRouter.post("/signup", (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  // Check if user already exists
  const checkUserSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserSql, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
    if (result.length > 0) {
      return res.status(400).json({ msg: "User already exists" });
    }
  });

  const role = "user";
  const sql = "INSERT INTO users (email, password, username, role) VALUES ?";
  const values = [[email, password, username, role]];

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
    return res.json({ msg: "Success" });
  });
});

usersRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
    if (result.length === 0) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const user = result[0];
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
    return res.json({ token });
  });
});

usersRouter.get("/me", auth, (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
    const user = result[0];
    return res.json({ user });
  });
});

// New route to list all users
usersRouter.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
    return res.json({ users: result });
  });
});

// New route to delete a user
usersRouter.delete("/user/:id", adminAuth, (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
    return res.json({ msg: "Success" });
  });
});

module.exports = usersRouter;

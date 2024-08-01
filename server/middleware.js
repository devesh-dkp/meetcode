require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("./models/user");

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid token" });
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { auth, adminAuth };

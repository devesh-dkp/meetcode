const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret"; // Ensure this is secure in production
const USERS = require("./models/user");

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
  auth(req, res, () => {
    const user = USERS.find((user) => user.id === req.user.id);
    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({ msg: "Admin access required" });
    }
  });
};

module.exports = { auth, adminAuth };

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const JWT_SECRET = "jwt_assignment" || process.env.JWT_SECERT_KEY; // In production, use an environment variable

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).send({ error: "No authentication token provided." });
    }

    const tokenString = token.replace("Bearer ", "");
    const decoded = jwt.verify(tokenString, JWT_SECRET);

    let user = await User.findOne({ username: decoded.username });
    if (!user) {
      user = await Admin.findOne({ username: decoded.username });
    }

    if (!user) {
      return res.status(401).send({ error: "User not found." });
    }

    req.token = tokenString;
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "Invalid token." });
    }
    res.status(500).send({ error: "Server error during authentication." });
  }
};

module.exports = authMiddleware;
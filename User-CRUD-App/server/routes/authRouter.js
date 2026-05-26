const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controller/authController");

// 🌟 ADD A MILD MIDDLEWARE WRAPPER:
// This checks for a token, but doesn't block the request if it's missing!
const jwt = require("jsonwebtoken");
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attaches user if token is valid
    } catch (err) {
      // Ignore token errors so public signups still work
    }
  }
  next();
};

router.post("/login", loginUser);

// 🌟 CHANGE THIS LINE: Add the optionalAuth wrapper here
router.post("/register", optionalAuth, registerUser);

module.exports = router;
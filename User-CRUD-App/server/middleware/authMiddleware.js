const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Extract token from authorization header (e.g., "Bearer <token>")
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    
    // Decode the token using your JWT secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user profile information right onto the request block
    req.user = decoded; 
    next(); // Pass control to the next handler function smoothly
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = { verifyToken };
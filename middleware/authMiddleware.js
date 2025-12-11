// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // No token found
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Support both: "Bearer token" and "token"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    // Decode token using your login signature:
    // jwt.sign({ id: user._id }, JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id to request
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;

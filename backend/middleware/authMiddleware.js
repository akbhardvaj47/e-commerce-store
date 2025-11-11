import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const requireSignIn = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ status: false, message: "No token provided" });
  }

  // 🔹 Remove "Bearer " prefix if present
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trim();
  }

  const jwt_secret = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded; // will contain _id or user info you signed during login
    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: "Invalid or expired token", error: error.message });
  }
};

export { requireSignIn };

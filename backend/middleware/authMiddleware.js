import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const requireSignIn = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ status: false, message: "No token provided" });
  }

  const jwt_secret = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: "Invalid token", error: error.message });
  }
};

export { requireSignIn };

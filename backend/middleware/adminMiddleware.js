import User from "../models/userModel.js";

const checkIsAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || user.role !== 1) {
      return res.status(403).json({
        message: "User is not admin",
        status: false,
      });
    }
    // User is admin — continue to next middleware/controller
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      status: false,
      error: error.message,
    });
  }
};

export default checkIsAdmin;

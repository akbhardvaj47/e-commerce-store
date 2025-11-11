import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/adminController.js";
import checkIsAdmin from "../middleware/adminMiddleware.js";
import { requireSignIn } from "../middleware/authMiddleware.js";
import userModel from "../models/userModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Category from "../models/categoryModel.js";

const adminRoute = express.Router();

adminRoute.get("/users", requireSignIn, checkIsAdmin, getAllUsers);
adminRoute.delete(
  "/users/delete-user/:id",
  requireSignIn,
  checkIsAdmin,
  deleteUser
);
adminRoute.put(
  "/users/update-user/:id",
  requireSignIn,
  checkIsAdmin,
  updateUser
);
adminRoute.get("/dashboard", requireSignIn, checkIsAdmin, async (req, res) => {
  try {
    const [users, products, categories] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Category.countDocuments(),
    ]);

    res.status(200).json({
      status: true,
      message: "dashboard fetched",
      users,
      products,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching dashboard stats",
      error: error.message,
    });
  }
});

export default adminRoute;

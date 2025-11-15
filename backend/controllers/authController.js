import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/email.js";

const register = async (req, res) => {
  try {
    const { name, email, password, phone, answer, role } = req.body;

    if (!name || !email || !password || !phone || !answer) {
      return res.status(400).send({
        status: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        status: false,
        message: "User already exists",
      });
    }

    // Hash the password with salt rounds = 10
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      answer,
      role: role || "user",
    });
    await user.save();

    const htmlMessage = `
      <h2 style="color:#e91e63; font-family:Arial; text-align:center;">
  Welcome to <strong>AkTechMart</strong>, ${name}! 👋
</h2>

<p style="font-size:16px; color:#333; font-family:Arial;">
  We're excited to have you onboard! Your account has been created successfully, and you're all set to explore a seamless online shopping experience.
</p>

<div style="background:#f8f8f8; padding:15px; border-left:4px solid #e91e63; margin:20px 0;">
  <p style="font-size:15px; font-family:Arial; margin:0;">
    <strong>What you can do now:</strong>
  </p>
  <ul style="font-size:15px; font-family:Arial; line-height:1.6; color:#444;">
    <li>Browse trending products across all categories</li>
    <li>Add items to your wishlist or cart</li>
    <li>Track your orders in real-time</li>
    <li>Enjoy exclusive deals and limited-time offers</li>
  </ul>
</div>

<p style="font-size:16px; font-family:Arial; color:#333;">
  We're committed to making your shopping smooth, fast, and enjoyable.
</p>

<p style="text-align:center; margin-top:30px;">
  <a href="https://your-frontend-url/login"
     style="background:#e91e63; color:white; padding:12px 22px; 
            text-decoration:none; border-radius:6px; 
            font-size:16px; font-family:Arial;">
    Login to Your Account
  </a>
</p>

<br>

<p style="font-size:16px; font-family:Arial; color:#333;">
  Happy Shopping! 🛒  
  <br>
  <strong>— The AkTechMart Team</strong>
</p>

    `;

    await sendEmail(email, "Welcome to MERN Store 🎉", htmlMessage);

    res.status(201).send({
      status: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send({
      status: false,
      message: "Server error",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        status: false,
        message: "Please enter email and password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        status: false,
        message: "User does not exist",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send({
        status: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).send({
      status: true,
      user: user.name,
      message: "User logged in successfully",
      token,
      email: user.email,
      userId: user._id,
      role: user.role, // ✅ add this
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Login Server error",
    });
  }
};

const forgetPasswordController = async (req, res) => {
  const { email, newPassword, answer } = req.body;
  if (!email || !newPassword || !answer) {
    return res.status(400).send({
      message: "All fields are required",
      status: false,
    });
  }
  const user = await User.findOne({ email, answer });
  if (!user) {
    return res.status(404).send({
      message: "User does not exist or answer is incorrect",
      status: false,
    });
  }
  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(user._id, { password: hashed });
  res.status(200).send({
    message: "Password reset successfully",
    status: true,
  });
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};
export { loginController, register, forgetPasswordController, updateUser };

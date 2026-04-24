import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/* TOKEN */
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

/* AUTH (LOGIN + SIGNUP) */
export const authUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    /* VALIDATION */
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    /* FIND USER */
    let user = await User.findOne({ email }).select("+password");

    /* LOGIN */
    if (user) {
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }

      user.lastLogin = new Date();
      await user.save();

      const token = generateToken(user._id);

      return res.json({
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        token,
      });
    }

    /* SIGNUP */
    user = await User.create({
      email,
      password,
      name,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });

  } catch (err) {
    console.error("AUTH ERROR:", err);

    return res.status(500).json({
      message: err.message || "Authentication failed",
    });
  }
};
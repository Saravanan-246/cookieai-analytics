import jwt from "jsonwebtoken";
import User from "../modules/auth/models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    /* GET TOKEN FROM HEADER */
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    /* VERIFY TOKEN */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* GET USER */
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    /* ATTACH USER TO REQUEST */
    req.user = user;

    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};
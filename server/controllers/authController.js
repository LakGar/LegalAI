import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../utils/email.js";

// Helper function to hash tokens
const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const signup = async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;
  try {
    if (!firstname || !lastname || !email || !phone || !password) {
      throw new Error(`All Fields are required`);
    }
    const emailAlreadyExist = await User.findOne({ email: email });
    const phoneAlreadyExist = await User.findOne({ phone: phone });
    if (emailAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    if (phoneAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationCode = generateVerificationCode();
    const hashedVerificationToken = hashToken(verificationCode);

    const user = new User({
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
      verificationToken: hashedVerificationToken,
      verificationExpires: Date.now() + 30 * 60 * 1000, // 30 minutes expiration
    });

    await user.save();

    // JWT

    // Send verification email with plain token (not hashed)
    sendVerificationEmail(
      "lakgarg2002@gmail.com",
      verificationCode,
      user.firstname
    );
    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined, // Do not return password in response
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    console.log("finding user");
    const hashedCode = hashToken(code);
    const user = await User.findOne({
      verificationToken: hashedCode,
      verificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    await user.save();

    // Generate the token after verification success
    generateTokenAndSetCookie(res, user._id); // Set token in cookie

    await sendWelcomeEmail("lakgarg2002@gmail.com", user.firstname);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error verifying email", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during email verification",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateTokenAndSetCookie(res, user._id);
    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not found",
      });
    }

    // Generate reset password token and hash it
    const resetPasswordToken = generateVerificationCode();
    const hashedResetPasswordToken = hashToken(resetPasswordToken);
    user.resetPasswordToken = hashedResetPasswordToken;
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 minutes expiration

    // Save user with reset password token and expiration
    await user.save();

    // Send email with the reset password token (not hashed)
    sendVerificationEmail(
      "lakgarg2002@gmail.com",
      resetPasswordToken,
      user.firstname
    );

    return res.status(200).json({
      success: true,
      message: "Password reset token sent to email",
    });
  } catch (error) {
    console.error("Error sending reset password token", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while sending the reset password token",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const hashedToken = hashToken(token);
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure the token is still valid
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update user's password and clear the reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the updated user
    await user.save();

    // Optionally, you can send an email to notify the user that their password was successfully changed
    sendWelcomeEmail("lakgarg2002@gmail.com", user.firstname);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while resetting the password",
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
};

import jwt from "jsonwebtoken";

export const verifyToken = (req, res) => {
  // Get the token from the cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided, authorization denied",
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
      message: "Token is valid",
      userId: decoded.userId,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

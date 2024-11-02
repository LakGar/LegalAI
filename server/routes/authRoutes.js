import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  resetPasswordRequest,
  resetPassword,
  verifyToken,
} from "../controllers/authController.js";

const router = express.Router();

// @route   POST api/auth/register
router.post("/signup", signup);

// @route   POST api/auth/verify-email
router.post("/verify-email", verifyEmail);

// @route   POST api/auth/login
router.post("/login", login);

// @route   POST api/auth/logout
router.post("/logout", logout);

// @route   POST api/auth/reset-password-request
router.post("/reset-password-request", resetPasswordRequest);

// @route   POST api/auth/reset-password
router.post("/reset-password", resetPassword);

// Backend route to verify token validity
router.get("/verify-token", verifyToken);

export default router;

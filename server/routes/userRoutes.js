import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  uploadProfileImage,
  getUserById,
} from "../controllers/userController.js";
import { upload } from "../config/multer.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route GET /user
 * @description Get user details
 * @access Private
 */
router.get("/", protect, getUser);

/**
 * @route GET /user/:id
 * @description Get user details by ID
 * @access Private
 */
router.get("/:id", protect, getUserById);

/**
 * @route PUT /user
 * @description Update user details
 * @access Private
 */
router.put("/", protect, updateUser);

/**
 * @route DELETE /user
 * @description Delete user account
 * @access Private
 */
router.delete("/", protect, deleteUser);

/**
 * @route POST /user/profile-image
 * @description Upload profile image
 * @access Private
 */
router.post(
  "/profile-image",
  protect,
  upload.single("profileImage"), // Multer middleware for single image upload
  uploadProfileImage
);

export default router;

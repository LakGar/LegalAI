import express from "express";
import {
  createFolder,
  getUserFolders,
  getFolderById,
  updateFolder,
  deleteFolder,
} from "../controllers/folderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new folder
router.post("/", protect, createFolder);

// Get all folders for the logged-in user
router.get("/", protect, getUserFolders);

// Get folder details by ID
router.get("/:id", protect, getFolderById);

// Update folder details
router.put("/:id", protect, updateFolder);

// Delete a folder
router.delete("/:id", protect, deleteFolder);

export default router;

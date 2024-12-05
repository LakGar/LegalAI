import express from "express";
import {
  createNote,
  getUserNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new note
router.post("/", protect, createNote);

// Get all notes for the logged-in user
router.get("/", protect, getUserNotes);

// Get a specific note by ID
router.get("/:id", protect, getNoteById);

// Update a note
router.put("/:id", protect, updateNote);

// Delete a note
router.delete("/:id", protect, deleteNote);

export default router;

import express from "express";
import {
  createChat,
  getChats,
  sendMessage,
  deleteChat,
  getChat,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new chat
router.post("/", protect, createChat);

// Get all chats for the logged-in user
router.get("/", protect, getChats);

// Get a chat
router.get("/:id", protect, getChat);

// Send a message in a chat
router.post("/:id/message", protect, sendMessage);

// Delete a chat
router.delete("/:id", protect, deleteChat);

export default router;

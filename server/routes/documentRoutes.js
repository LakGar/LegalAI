import express from "express";
import {
  uploadDocument,
  getUserDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  getFile,
} from "../controllers/documentController.js";
import { upload } from "../config/multer.js"; // Assuming multer is configured for file uploads
import { protect } from "../middleware/authMiddleware.js"; // Middleware to verify user authentication

const router = express.Router();

// Upload a new document
router.post("/", protect, upload.single("file"), uploadDocument);

// Get all documents for the logged-in user
router.get("/", protect, getUserDocuments);

// Get a specific document by ID
router.get("/:id", protect, getDocumentById);

// Update a document by ID
router.put("/:id", protect, updateDocument);

// Delete a document by ID
router.delete("/:id", protect, deleteDocument);

router.get("/file/:fileName", protect, getFile);

export default router;

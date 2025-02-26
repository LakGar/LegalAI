import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import {
  uploadDocument,
  getUserDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  getFile,
  analyzeDocument,
} from "../controllers/documentController.js";

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Protected routes
router.use(protect);

router
  .route("/")
  .post(upload.single("file"), uploadDocument)
  .get(getUserDocuments);

router
  .route("/:id")
  .get(getDocumentById)
  .put(updateDocument)
  .delete(deleteDocument);

// File access route
router.get("/file/:id", getFile);

// Analysis route
router.post("/analyze", analyzeDocument);

export default router;

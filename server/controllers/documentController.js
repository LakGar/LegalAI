import { Document } from "../models/documentModel.js";
import { User } from "../models/userModel.js";
import { Business } from "../models/businessModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Upload a new document
 * @route POST /document
 * @access Private
 */
export const uploadDocument = async (req, res) => {
  try {
    const userId = req.user?._id; // Ensure logged-in user
    const { name, type, description, businessId } = req.body;

    if (!userId || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields are required, including the file",
      });
    }

    const documentUrl = req.file.path; // Assuming multer stores the file path

    const document = new Document({
      name,
      type,
      description,
      documentUrl,
      user: userId,
      business: businessId || null,
    });

    await document.save();

    // Associate document with the user
    await User.findByIdAndUpdate(userId, {
      $push: { documents: document._id },
    });

    // Associate document with the business, if provided
    if (businessId) {
      await Business.findByIdAndUpdate(businessId, {
        $push: { documents: document._id },
      });
    }

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: document,
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Get all documents for a user
 * @route GET /document
 * @access Private
 */
export const getUserDocuments = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const documents = await Document.find({ user: userId });

    return res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Get a single document by ID
 * @route GET /document/:id
 * @access Private
 */
export const getDocumentById = async (req, res) => {
  try {
    const documentId = req.params.id;

    if (!documentId) {
      return res
        .status(400)
        .json({ success: false, message: "Document ID is required" });
    }

    const document = await Document.findById(documentId).populate(
      "user",
      "firstname lastname email"
    );

    if (!document) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }

    return res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    console.error("Error fetching document:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Update a document
 * @route PUT /document/:id
 * @access Private
 */
export const updateDocument = async (req, res) => {
  try {
    const documentId = req.params.id;
    const userId = req.user?._id;

    if (!documentId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Document ID and User ID are required",
      });
    }

    const updates = req.body;
    const allowedUpdates = ["name", "type", "description"];
    const isValidOperation = Object.keys(updates).every((field) =>
      allowedUpdates.includes(field)
    );

    if (!isValidOperation) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid update fields provided" });
    }

    const document = await Document.findOneAndUpdate(
      { _id: documentId, user: userId },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Document updated successfully",
      data: document,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Delete a document
 * @route DELETE /document/:id
 * @access Private
 */
export const deleteDocument = async (req, res) => {
  try {
    const documentId = req.params.id;
    const userId = req.user?._id;

    if (!documentId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Document ID and User ID are required",
      });
    }

    const document = await Document.findOneAndDelete({
      _id: documentId,
      user: userId,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found or access denied",
      });
    }

    // Remove reference from user and business
    await User.findByIdAndUpdate(userId, { $pull: { documents: documentId } });
    if (document.business) {
      await Business.findByIdAndUpdate(document.business, {
        $pull: { documents: documentId },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getFile = (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../uploads", fileName); // Adjust path as needed

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: "File not found",
    });
  }

  // Send the file
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).json({
        success: false,
        message: "Error accessing file",
      });
    }
  });
};

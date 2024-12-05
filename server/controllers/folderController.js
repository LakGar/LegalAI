import { Folder } from "../models/folderModel.js";
import { Document } from "../models/documentModel.js";
import { User } from "../models/userModel.js";

/**
 * Create a new folder
 * @route POST /folders
 * @access Private
 */
export const createFolder = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { name, parentFolderId } = req.body;

    if (!userId || !name) {
      return res.status(400).json({
        success: false,
        message: "User ID and folder name are required",
      });
    }

    // Create new folder
    const folder = new Folder({
      name,
      user: userId,
      parentFolder: parentFolderId || null,
    });

    await folder.save();

    // Update the user's folder list
    await User.findByIdAndUpdate(userId, { $push: { folder: folder._id } });

    return res.status(201).json({
      success: true,
      message: "Folder created successfully",
      data: folder,
    });
  } catch (error) {
    console.error("Error creating folder:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Get all folders for a user
 * @route GET /folders
 * @access Private
 */
export const getUserFolders = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const folders = await Folder.find({ user: userId }).populate(
      "parentFolder",
      "name"
    );

    return res.status(200).json({
      success: true,
      data: folders,
    });
  } catch (error) {
    console.error("Error fetching folders:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Get folder details by ID
 * @route GET /folders/:id
 * @access Private
 */
export const getFolderById = async (req, res) => {
  try {
    const folderId = req.params.id;

    if (!folderId) {
      return res.status(400).json({
        success: false,
        message: "Folder ID is required",
      });
    }

    const folder = await Folder.findById(folderId)
      .populate("parentFolder", "name")
      .populate("documents", "name");

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: folder,
    });
  } catch (error) {
    console.error("Error fetching folder:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Update folder details
 * @route PUT /folders/:id
 * @access Private
 */
export const updateFolder = async (req, res) => {
  try {
    const folderId = req.params.id;
    const userId = req.user?._id;
    const { name } = req.body;

    if (!folderId || !userId || !name) {
      return res.status(400).json({
        success: false,
        message: "Folder ID, User ID, and folder name are required",
      });
    }

    const folder = await Folder.findOneAndUpdate(
      { _id: folderId, user: userId },
      { name },
      { new: true, runValidators: true }
    );

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Folder updated successfully",
      data: folder,
    });
  } catch (error) {
    console.error("Error updating folder:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Delete a folder
 * @route DELETE /folders/:id
 * @access Private
 */
export const deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.id;
    const userId = req.user?._id;

    if (!folderId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Folder ID and User ID are required",
      });
    }

    const folder = await Folder.findOneAndDelete({
      _id: folderId,
      user: userId,
    });

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found or access denied",
      });
    }

    // Remove folder reference from user
    await User.findByIdAndUpdate(userId, { $pull: { folder: folderId } });

    // Remove all documents within the folder
    await Document.deleteMany({ folder: folderId });

    return res.status(200).json({
      success: true,
      message: "Folder deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting folder:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

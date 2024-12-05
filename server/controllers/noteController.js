import { Note } from "../models/noteModel.js";
import { Folder } from "../models/folderModel.js";
import { User } from "../models/userModel.js";

/**
 * Create a new note
 * @route POST /notes
 * @access Private
 */
export const createNote = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { title, content, folderId } = req.body;

    if (!userId || !title || !content) {
      return res.status(400).json({
        success: false,
        message: "User ID, title, and content are required",
      });
    }

    // Create a new note
    const note = new Note({
      title,
      content,
      user: userId,
      folder: folderId || null,
    });

    await note.save();

    // If folderId is provided, associate the note with the folder
    if (folderId) {
      await Folder.findByIdAndUpdate(folderId, { $push: { notes: note._id } });
    }

    // Associate the note with the user
    await User.findByIdAndUpdate(userId, { $push: { notes: note._id } });

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Get all notes for a user
 * @route GET /notes
 * @access Private
 */
export const getUserNotes = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const notes = await Note.find({ user: userId });

    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Get a specific note by ID
 * @route GET /notes/:id
 * @access Private
 */
export const getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;

    if (!noteId) {
      return res.status(400).json({
        success: false,
        message: "Note ID is required",
      });
    }

    const note = await Note.findById(noteId).populate("folder", "name");

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error("Error fetching note:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Update a note
 * @route PUT /notes/:id
 * @access Private
 */
export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user?._id;
    const { title, content, folderId } = req.body;

    if (!noteId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Note ID and User ID are required",
      });
    }

    const updates = { title, content, folder: folderId };
    const allowedUpdates = ["title", "content", "folder"];
    const isValidOperation = Object.keys(updates).every((key) =>
      allowedUpdates.includes(key)
    );

    if (!isValidOperation) {
      return res.status(400).json({
        success: false,
        message: "Invalid update fields provided",
      });
    }

    const note = await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Delete a note
 * @route DELETE /notes/:id
 * @access Private
 */
export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user?._id;

    if (!noteId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Note ID and User ID are required",
      });
    }

    const note = await Note.findOneAndDelete({ _id: noteId, user: userId });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or access denied",
      });
    }

    // Remove reference from the folder if the note is associated with one
    if (note.folder) {
      await Folder.findByIdAndUpdate(note.folder, { $pull: { notes: noteId } });
    }

    // Remove reference from the user
    await User.findByIdAndUpdate(userId, { $pull: { notes: noteId } });

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

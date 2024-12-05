import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document", // Optional: Link the note to a specific document
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder", // Optional: Link the note to a specific folder
    },
    tags: [
      {
        type: String, // Tags for categorization and search
      },
    ],
    isPinned: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    lastEditedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);

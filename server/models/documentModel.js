import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["contract", "agreement", "report", "invoice", "other"],
      default: "other",
    },
    description: {
      type: String,
    },
    documentUrl: {
      type: String,
      required: true,
    },
    analysisResult: {
      type: mongoose.Schema.Types.Mixed, // Can store varied analysis results (e.g., JSON, text)
    },
    folders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
      },
    ],
    status: {
      type: String,
      enum: ["pending", "analyzed", "in-progress"],
      default: "pending",
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    analyzedAt: {
      type: Date,
    },
    tags: [
      {
        type: String,
      },
    ],
    sharedWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },

    version: {
      type: Number,
      default: 1,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Document = mongoose.model("Document", documentSchema);

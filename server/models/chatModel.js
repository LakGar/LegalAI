import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["text", "file", "image", "other"],
          default: "text",
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["sent", "delivered", "read"],
          default: "sent",
        },
      },
    ],
    lastMessage: {
      content: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);

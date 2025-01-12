import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // The current user
    },
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document", // Reference to the associated document
    },
    messages: [
      {
        sender: {
          type: String,
          enum: ["user", "ai"], // Specify the sender explicitly
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["text", "file", "image", "other"], // Content type
          default: "text",
        },
        timestamp: {
          type: Date,
          default: Date.now, // Automatically set the timestamp
        },
        status: {
          type: String,
          enum: ["sent", "delivered", "read"], // Status of the message
          default: "sent",
        },
      },
    ],
    lastMessage: {
      content: String,
      timestamp: {
        type: Date,
        default: Date.now, // Timestamp of the last message
      },
      sender: {
        type: String,
        enum: ["user", "ai"], // The sender of the last message
      },
    },
    isArchived: {
      type: Boolean,
      default: false, // Option to archive the chat
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);

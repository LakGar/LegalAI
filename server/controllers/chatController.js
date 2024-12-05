import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";

/**
 * Create a new chat
 * @route POST /chat
 * @access Private
 */
export const createChat = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { recipientId } = req.body;

    if (!userId || !recipientId) {
      return res.status(400).json({
        success: false,
        message: "Both sender and recipient IDs are required",
      });
    }

    // Check if a chat already exists between the two users
    const existingChat = await Chat.findOne({
      users: { $all: [userId, recipientId] },
    });

    if (existingChat) {
      return res.status(200).json({
        success: true,
        message: "Chat already exists",
        data: existingChat,
      });
    }

    // Create a new chat
    const chat = new Chat({
      users: [userId, recipientId],
    });

    await chat.save();

    return res.status(201).json({
      success: true,
      message: "Chat created successfully",
      data: chat,
    });
  } catch (error) {
    console.error("Error creating chat:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Get all chats for the logged-in user
 * @route GET /chat
 * @access Private
 */
export const getChats = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Fetch chats for the logged-in user
    const chats = await Chat.find({ users: userId })
      .populate("users", "firstname lastname email")
      .populate("lastMessage.sender", "firstname lastname email")
      .sort({ updatedAt: -1 }); // Sort by last updated

    return res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Send a message in a chat
 * @route POST /chat/:id/message
 * @access Private
 */
export const sendMessage = async (req, res) => {
  try {
    const userId = req.user?._id;
    const chatId = req.params.id;
    const { content } = req.body;

    if (!userId || !chatId || !content) {
      return res.status(400).json({
        success: false,
        message: "Chat ID, sender ID, and content are required",
      });
    }

    // Find the chat
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // Add the message to the chat
    const message = {
      sender: userId,
      content,
    };

    chat.messages.push(message);
    chat.lastMessage = message;
    await chat.save();

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Delete a chat
 * @route DELETE /chat/:id
 * @access Private
 */
export const deleteChat = async (req, res) => {
  try {
    const userId = req.user?._id;
    const chatId = req.params.id;

    if (!userId || !chatId) {
      return res.status(400).json({
        success: false,
        message: "Chat ID and User ID are required",
      });
    }

    // Find and delete the chat
    const chat = await Chat.findOneAndDelete({
      _id: chatId,
      users: userId, // Ensure the user is part of the chat
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

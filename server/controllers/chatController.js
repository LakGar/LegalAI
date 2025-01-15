import OpenAI from "openai";
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createChat = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { documentId } = req.body; // Optional document reference

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Check if a chat already exists for the user and the optional document
    const existingChat = await Chat.findOne({
      user: userId,
      document: documentId || null,
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
      user: userId,
      document: documentId || null,
    });

    await chat.save();

    // Add chat to the user's chats array
    await User.findByIdAndUpdate(
      userId,
      { $push: { chats: chat._id } },
      { new: true }
    );

    // If a document is provided, link the chat to the document
    if (documentId) {
      await Document.findByIdAndUpdate(
        documentId,
        { chat: chat._id },
        { new: true }
      );
    }

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

    // Fetch all chats for the user, optionally populating documents
    const chats = await Chat.find({ user: userId })
      .populate("document", "name uploadedAt") // Populate document details
      .sort({ updatedAt: -1 }); // Sort by most recently updated

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
 * Get a  chat
 * @route GET /chat/:id/
 * @access Private
 *
 */
/**
 * Get a single chat
 * @route GET /chat/:id
 * @access Private
 */
export const getChat = async (req, res) => {
  try {
    const userId = req.user?._id;
    const chatId = req.params.id;

    if (!userId || !chatId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Chat ID are required",
      });
    }

    // Find the chat and populate necessary details
    const chat = await Chat.findOne({ _id: chatId, user: userId })
      .populate("document", "name uploadedAt") // Populate document details
      .populate("messages.sender", "firstname lastname email"); // Populate sender details in messages

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    console.error("Error fetching chat:", error);
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
    const { content, type } = req.body;

    if (!userId || !chatId || !content) {
      return res.status(400).json({
        success: false,
        message: "Chat ID, user ID, and message content are required",
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

    // Add the user's message to the chat
    const userMessage = {
      sender: userId,
      content,
      type: type || "text",
    };
    chat.messages.push(userMessage);

    // Save the chat after adding the user's message
    await chat.save();

    // Prepare the conversation history for the AI
    const messages = chat.messages.map((msg) => ({
      role: msg.sender === "ai" ? "assistant" : "user",
      content: msg.content,
    }));

    // Generate AI response using OpenAI API
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Choose the model you prefer
      messages,
    });

    const aiMessageContent = aiResponse.choices[0]?.message?.content?.trim();

    if (aiMessageContent) {
      const aiMessage = {
        sender: "ai",
        content: aiMessageContent,
        type: "text",
      };

      // Add the AI's message to the chat
      chat.messages.push(aiMessage);

      // Update the last message in the chat
      chat.lastMessage = aiMessage;

      // Save the chat after adding the AI's message
      await chat.save();
    }

    // Return the updated chat
    return res.status(200).json({
      success: true,
      message: "Messages sent successfully",
      data: {
        userMessage,
        aiMessage: aiMessageContent ? { content: aiMessageContent } : null,
      },
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

    // Find and delete the chat for the user
    const chat = await Chat.findOneAndDelete({
      _id: chatId,
      user: userId, // Ensure the chat belongs to the user
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

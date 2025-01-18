import OpenAI from "openai";
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";
import winston from "winston";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

// Create Chat
export const createChat = async (req, res) => {
  logger.info("Starting chat creation process.");
  try {
    const userId = req.user?._id;
    const { documentId } = req.body;

    if (!userId) {
      logger.warn("User ID missing in request.");
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    let existingChat = null;
    if (documentId !== null) {
      logger.info(`Checking for existing chat with documentId: ${documentId}`);
      existingChat = await Chat.findOne({ document: documentId });
    }

    if (existingChat) {
      logger.info("Existing chat found.");
      return res.status(200).json({
        success: true,
        message: "Chat already exists.",
        data: existingChat,
      });
    }

    const chat = new Chat({
      user: userId,
      document: documentId || null,
    });

    await chat.save();
    logger.info(`Chat created with ID: ${chat._id}`);

    await User.findByIdAndUpdate(
      userId,
      { $push: { chats: chat._id } },
      { new: true }
    );
    logger.info(`Chat added to user: ${userId}`);

    if (documentId) {
      await Document.findByIdAndUpdate(
        documentId,
        { chat: chat._id },
        { new: true }
      );
      logger.info(`Chat linked to document: ${documentId}`);
    }

    return res.status(201).json({
      success: true,
      message: "Chat created successfully.",
      data: chat,
    });
  } catch (error) {
    logger.error(`Error creating chat: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Failed to create chat. Please try again later.",
      error: error.message || "Unknown error occurred.",
    });
  }
};

// Get All Chats
export const getChats = async (req, res) => {
  logger.info("Fetching all chats for user.");
  try {
    const userId = req.user?._id;

    if (!userId) {
      logger.warn("User ID missing in request.");
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const chats = await Chat.find({ user: userId })
      .populate("document", "name uploadedAt")
      .sort({ updatedAt: -1 });

    logger.info(`Fetched ${chats.length} chats for user: ${userId}`);
    return res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    logger.error(`Error fetching chats: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch chats. Please try again later.",
      error: error.message || "Unknown error occurred.",
    });
  }
};

// Get Chat by ID
export const getChat = async (req, res) => {
  logger.info("Fetching chat by ID.");
  try {
    const userId = req.user?._id;
    const chatId = req.params.id;

    if (!userId || !chatId) {
      logger.warn("User ID or Chat ID missing in request.");
      return res.status(400).json({
        success: false,
        message: "User ID and Chat ID are required.",
      });
    }

    const chat = await Chat.findOne({ _id: chatId, user: userId })
      .populate("document", "name uploadedAt")
      .populate("messages.sender", "firstname lastname email");

    if (!chat) {
      logger.warn(`Chat not found for ID: ${chatId}`);
      return res.status(404).json({
        success: false,
        message: "Chat not found or access denied.",
      });
    }

    logger.info(`Fetched chat with ID: ${chatId}`);
    return res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    logger.error(`Error fetching chat: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch chat. Please try again later.",
      error: error.message || "Unknown error occurred.",
    });
  }
};

// Send Message
export const sendMessage = async (req, res) => {
  logger.info("Attempting to send message to chat.");
  try {
    const userId = req.user?._id;
    const chatId = req.params.id;
    const { content, type } = req.body;

    if (!userId || !chatId || !content) {
      logger.warn("Required data missing in request.");
      return res.status(400).json({
        success: false,
        message: "Chat ID, User ID, and message content are required.",
      });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      logger.warn(`Chat not found for ID: ${chatId}`);
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    const userMessage = {
      sender: "user",
      content,
      type: type || "text",
    };
    chat.messages.push(userMessage);
    logger.info(`Added user message to chat ID: ${chatId}`);

    await chat.save();

    const messages = chat.messages.map((msg) => ({
      role: msg.sender === "ai" ? "assistant" : "user",
      content: msg.content,
    }));

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const aiMessageContent = aiResponse.choices[0]?.message?.content?.trim();

    if (aiMessageContent) {
      const aiMessage = {
        sender: "ai",
        content: aiMessageContent,
        type: "text",
      };

      chat.messages.push(aiMessage);
      chat.lastMessage = aiMessage;
      await chat.save();
      logger.info("AI response added to chat.");
    }

    return res.status(200).json({
      success: true,
      message: "Messages sent successfully.",
      data: {
        userMessage,
        aiMessage: aiMessageContent ? { content: aiMessageContent } : null,
      },
    });
  } catch (error) {
    logger.error(`Error sending message: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
      error: error.message || "Unknown error occurred.",
    });
  }
};

// Delete Chat
export const deleteChat = async (req, res) => {
  logger.info("Attempting to delete chat.");
  try {
    const userId = req.user?._id;
    const chatId = req.params.id;

    if (!userId || !chatId) {
      logger.warn("User ID or Chat ID missing in request.");
      return res.status(400).json({
        success: false,
        message: "Chat ID and User ID are required.",
      });
    }

    const chat = await Chat.findOneAndDelete({
      _id: chatId,
      user: userId,
    });

    if (!chat) {
      logger.warn(`Chat not found for ID: ${chatId}`);
      return res.status(404).json({
        success: false,
        message: "Chat not found or access denied.",
      });
    }

    logger.info(`Chat deleted with ID: ${chatId}`);
    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully.",
    });
  } catch (error) {
    logger.error(`Error deleting chat: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Failed to delete chat. Please try again later.",
      error: error.message || "Unknown error occurred.",
    });
  }
};

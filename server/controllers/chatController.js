import OpenAI from "openai";
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";
import { Document } from "../models/documentModel.js";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create Chat
export const createChat = async (req, res) => {
  console.log("Starting chat creation process.");
  try {
    const userId = req.user?._id;
    const { documentId } = req.body;

    if (!userId) {
      console.error("User ID missing in request.");
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    let existingChat = null;
    if (documentId) {
      console.log(`Checking for existing chat with documentId: ${documentId}`);
      existingChat = await Chat.findOne({ document: documentId });
    }

    if (existingChat) {
      console.log("Existing chat found.");
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
    console.log(`Chat created with ID: ${chat._id}`);

    await User.findByIdAndUpdate(
      userId,
      { $push: { chats: chat._id } },
      { new: true }
    );
    console.log(`Chat added to user: ${userId}`);

    if (documentId) {
      const document = await Document.findById(documentId);
      if (!document) {
        throw new Error("Document not found");
      }

      await Document.findByIdAndUpdate(
        documentId,
        { chat: chat._id },
        { new: true }
      );
      console.log(`Chat linked to document: ${documentId}`);
    }

    return res.status(201).json({
      success: true,
      message: "Chat created successfully.",
      data: chat,
    });
  } catch (error) {
    console.error(`Error creating chat: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Failed to create chat. Please try again later.",
      error: error.message || "Unknown error occurred.",
    });
  }
};

// Get All Chats
export const getChats = async (req, res) => {
  console.log("Fetching all chats for user.");
  try {
    const userId = req.user?._id;

    if (!userId) {
      console.error("User ID missing in request.");
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const chats = await Chat.find({ user: userId })
      .populate("document", "name uploadedAt")
      .sort({ updatedAt: -1 });

    console.log(`Fetched ${chats.length} chats for user: ${userId}`);
    return res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    console.error(`Error fetching chats: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch chats. Please try again later.",
      error: error.message || "Unknown error occurred.",
    });
  }
};

// Get Chat by ID
export const getChat = async (req, res) => {
  console.log("Fetching chat by ID.");
  try {
    const userId = req.user?._id;
    const chatId = req.params.id;

    if (!userId || !chatId) {
      console.error("User ID or Chat ID missing in request.");
      return res.status(400).json({
        success: false,
        message: "User ID and Chat ID are required.",
      });
    }

    const chat = await Chat.findOne({ _id: chatId, user: userId })
      .populate("document", "name uploadedAt")
      .populate("messages.sender", "firstname lastname email");

    if (!chat) {
      console.error(`Chat not found for ID: ${chatId}`);
      return res.status(404).json({
        success: false,
        message: "Chat not found or access denied.",
      });
    }

    console.log(`Fetched chat with ID: ${chatId}`);
    return res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    console.error(`Error fetching chat: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch chat. Please try again later.",
      error: error.message || "Unknown error occurred.",
    });
  }
};

// Send Message
export const sendMessage = async (req, res) => {
  console.log("Attempting to send message to chat.");
  try {
    const userId = req.user?._id;
    const chatId = req.params.id;
    const { content } = req.body;

    if (!userId || !chatId || !content) {
      console.error("Required data missing in request.");
      return res.status(400).json({
        success: false,
        message: "Chat ID, User ID, and message content are required.",
      });
    }

    const chat = await Chat.findById(chatId).populate("document");

    if (!chat) {
      console.error(`Chat not found for ID: ${chatId}`);
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    const documentContext = chat.document?.analysisResult || "";
    const userMessage = {
      sender: "user",
      content: content,
      type: "text",
    };

    chat.messages.push(userMessage);
    await chat.save();

    const messages = [
      {
        role: "system",
        content: `You are a professional legal assistant. Your role is to help users understand and analyze legal documents. Here is the document analysis for context:

${documentContext}

Please use this context to provide informed responses to the user's questions. Send your response in html tags:

`,
      },
      ...chat.messages.map((msg) => ({
        role: msg.sender === "ai" ? "assistant" : "user",
        content: msg.content,
      })),
    ];

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
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
    console.error(`Error sending message: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
      error: error.message || "Unknown error occurred.",
    });
  }
};

// Delete Chat
export const deleteChat = async (req, res) => {
  console.log("Attempting to delete chat.");
  try {
    const userId = req.user?._id;
    const chatId = req.params.id;

    if (!userId || !chatId) {
      console.error("User ID or Chat ID missing in request.");
      return res.status(400).json({
        success: false,
        message: "Chat ID and User ID are required.",
      });
    }

    const chat = await Chat.findOneAndDelete({ _id: chatId, user: userId });

    if (!chat) {
      console.error(`Chat not found for ID: ${chatId}`);
      return res.status(404).json({
        success: false,
        message: "Chat not found or access denied.",
      });
    }

    console.log(`Chat deleted with ID: ${chatId}`);
    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully.",
    });
  } catch (error) {
    console.error(`Error deleting chat: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Failed to delete chat. Please try again later.",
      error: error.message || "Unknown error occurred.",
    });
  }
};

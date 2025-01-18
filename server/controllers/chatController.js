import OpenAI from "openai";
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createChat = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { documentId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }
    let existingChat = null;
    if (documentId !== undefined) {
      existingChat = await Chat.findOne({
        document: documentId,
      });
    }
    if (existingChat) {
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

    await User.findByIdAndUpdate(
      userId,
      { $push: { chats: chat._id } },
      { new: true }
    );

    if (documentId) {
      await Document.findByIdAndUpdate(
        documentId,
        { chat: chat._id },
        { new: true }
      );
    }

    return res.status(201).json({
      success: true,
      message: "Chat created successfully.",
      data: chat,
    });
  } catch (error) {
    console.error("Error creating chat:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create chat. Please try again later.",
      error: error.message || "Unknown error occurred.",
    });
  }
};

export const getChats = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const chats = await Chat.find({ user: userId })
      .populate("document", "name uploadedAt")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch chats. Please try again later.",
      error: error.message || "Unknown error occurred.",
    });
  }
};

export const getChat = async (req, res) => {
  try {
    const userId = req.user?._id;
    const chatId = req.params.id;

    if (!userId || !chatId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Chat ID are required.",
      });
    }

    const chat = await Chat.findOne({ _id: chatId, user: userId })
      .populate("document", "name uploadedAt")
      .populate("messages.sender", "firstname lastname email");

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found or access denied.",
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
      message: "Failed to fetch chat. Please try again later.",
      error: error.message || "Unknown error occurred.",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const userId = req.user?._id;
    const chatId = req.params.id;
    const { content, type } = req.body;

    if (!userId || !chatId || !content) {
      return res.status(400).json({
        success: false,
        message: "Chat ID, User ID, and message content are required.",
      });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    const userMessage = {
      sender: userId,
      content,
      type: type || "text",
    };
    chat.messages.push(userMessage);

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
    console.error("Error sending message:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
      error: error.message || "Unknown error occurred.",
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const userId = req.user?._id;
    const chatId = req.params.id;

    if (!userId || !chatId) {
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
      return res.status(404).json({
        success: false,
        message: "Chat not found or access denied.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete chat. Please try again later.",
      error: error.message || "Unknown error occurred.",
    });
  }
};

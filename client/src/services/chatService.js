import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/chat"; // Base URL for the chat API

/**
 * Get all chats for the logged-in user
 * @returns {Promise<Object>} - Returns chat data
 */
export const getChats = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const { data } = await axios.get(API_BASE_URL, config);
    return data;
  } catch (error) {
    console.error(
      "Error fetching chats:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to fetch chats.");
  }
};

/**
 * Get a single chat by ID
 * @param {string} chatId - ID of the chat
 * @returns {Promise<Object>} - Returns chat details
 */
export const getChat = async (chatId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const { data } = await axios.get(`${API_BASE_URL}/${chatId}`, config);
    return data;
  } catch (error) {
    console.error(
      "Error fetching chat:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to fetch chat.");
  }
};

/**
 * Create a new chat
 * @param {string} [documentId] - Optional document ID to associate with the chat
 * @returns {Promise<Object>} - Returns the created chat
 */
export const createNewChat = async (documentId) => {
  try {
    console.log("Chat service creating chat with document:", documentId); // Debug log

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const response = await axios.post("/api/chats", { documentId }, config);

    console.log("Chat service response:", response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error("Chat service error:", error.response?.data || error); // Debug log
    throw error;
  }
};

/**
 * Send a message in a specific chat
 * @param {string} chatId - ID of the chat
 * @param {string} content - Message content
 * @param {string} [type] - Message type (default is "text")
 * @returns {Promise<Object>} - Returns the updated chat with the new message
 */
export const sendMessage = async (chatId, content, type = "text") => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const { data } = await axios.post(
      `${API_BASE_URL}/${chatId}/message`,
      { content, type },
      config
    );

    return data;
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to send message.");
  }
};

/**
 * Delete a chat by ID
 * @param {string} chatId - ID of the chat
 */
export const deleteChat = async (chatId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await axios.delete(`${API_BASE_URL}/${chatId}`, config);
  } catch (error) {
    console.error(
      "Error deleting chat:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Failed to delete chat.");
  }
};

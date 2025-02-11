import {
  CHAT_LIST_REQUEST,
  CHAT_LIST_SUCCESS,
  CHAT_LIST_FAIL,
  CHAT_CREATE_REQUEST,
  CHAT_CREATE_SUCCESS,
  CHAT_CREATE_FAIL,
  CHAT_DETAILS_REQUEST,
  CHAT_DETAILS_SUCCESS,
  CHAT_DETAILS_FAIL,
  CHAT_SEND_MESSAGE_REQUEST,
  CHAT_SEND_MESSAGE_SUCCESS,
  CHAT_SEND_MESSAGE_FAIL,
  CHAT_DELETE_REQUEST,
  CHAT_DELETE_SUCCESS,
  CHAT_DELETE_FAIL,
} from "../constants/chatConstants";
import {
  getChats as fetchChats,
  getChat as fetchChat,
  createChat as createNewChat,
  sendMessage as sendChatMessage,
  deleteChat as removeChat,
} from "../../services/chatService";
import axios from "axios";

export const listChats = () => async (dispatch) => {
  try {
    dispatch({ type: CHAT_LIST_REQUEST });
    const data = await fetchChats();
    dispatch({ type: CHAT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CHAT_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getChatDetails = (chatId) => async (dispatch) => {
  try {
    dispatch({ type: CHAT_DETAILS_REQUEST });
    const data = await fetchChat(chatId);
    dispatch({ type: CHAT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CHAT_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const initiateChat = (documentId) => async (dispatch) => {
  try {
    dispatch({ type: CHAT_CREATE_REQUEST });

    console.log("Creating chat with document ID:", documentId);

    const response = await axios.post(
      "http://localhost:8000/api/chat",
      { documentId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("Chat creation response:", response.data);

    dispatch({
      type: CHAT_CREATE_SUCCESS,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    console.error("Chat creation error:", error.response?.data || error);

    dispatch({
      type: CHAT_CREATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });

    throw error;
  }
};

export const sendMessage = (chatId, message) => async (dispatch) => {
  try {
    dispatch({ type: CHAT_SEND_MESSAGE_REQUEST });

    const { data } = await sendChatMessage(chatId, message);

    dispatch({
      type: CHAT_SEND_MESSAGE_SUCCESS,
      payload: data,
    });

    return data; // Return the message data
  } catch (error) {
    dispatch({
      type: CHAT_SEND_MESSAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    throw error; // Ensure the error propagates for handling
  }
};

export const deleteChat = (chatId) => async (dispatch) => {
  try {
    dispatch({ type: CHAT_DELETE_REQUEST });
    await removeChat(chatId);
    dispatch({ type: CHAT_DELETE_SUCCESS, payload: chatId });
  } catch (error) {
    dispatch({
      type: CHAT_DELETE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

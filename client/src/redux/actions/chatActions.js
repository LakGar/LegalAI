import {
  CHAT_LIST_REQUEST,
  CHAT_LIST_SUCCESS,
  CHAT_LIST_FAIL,
  CHAT_CREATE_REQUEST,
  CHAT_CREATE_SUCCESS,
  CHAT_CREATE_FAIL,
  CHAT_SEND_MESSAGE_REQUEST,
  CHAT_SEND_MESSAGE_SUCCESS,
  CHAT_SEND_MESSAGE_FAIL,
} from "../constants/chatConstants";
import { getChats, createChat, sendMessage } from "../services/chatService";

export const listChats = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CHAT_LIST_REQUEST });

    const { data } = await getChats();

    dispatch({
      type: CHAT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHAT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNewChat = (documentId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHAT_CREATE_REQUEST });

    const { data } = await createChat(documentId);

    dispatch({
      type: CHAT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHAT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendChatMessage =
  (chatId, content) => async (dispatch, getState) => {
    try {
      dispatch({ type: CHAT_SEND_MESSAGE_REQUEST });

      const { data } = await sendMessage(chatId, content);

      dispatch({
        type: CHAT_SEND_MESSAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHAT_SEND_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

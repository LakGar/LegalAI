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

export const chatListReducer = (state = { chats: [] }, action) => {
  switch (action.type) {
    case CHAT_LIST_REQUEST:
      return { loading: true, chats: [] };
    case CHAT_LIST_SUCCESS:
      return { loading: false, chats: action.payload };
    case CHAT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const chatCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CHAT_CREATE_REQUEST:
      return { loading: true };
    case CHAT_CREATE_SUCCESS:
      return { loading: false, success: true, chat: action.payload };
    case CHAT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const chatSendMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case CHAT_SEND_MESSAGE_REQUEST:
      return { loading: true };
    case CHAT_SEND_MESSAGE_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case CHAT_SEND_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

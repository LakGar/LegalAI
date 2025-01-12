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

export const chatDetailsReducer = (state = { chat: {} }, action) => {
  switch (action.type) {
    case CHAT_DETAILS_REQUEST:
      return { loading: true, chat: {} };
    case CHAT_DETAILS_SUCCESS:
      return { loading: false, chat: action.payload };
    case CHAT_DETAILS_FAIL:
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

export const chatDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CHAT_DELETE_REQUEST:
      return { loading: true };
    case CHAT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CHAT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

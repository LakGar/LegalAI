import { combineReducers } from "redux";
import authReducer from "./authReducer"; // Import authReducer
import { userReducer } from "./userReducer";
import { documentReducer } from "./documentReducer";
import {
  chatListReducer,
  chatDetailsReducer,
  chatCreateReducer,
  chatSendMessageReducer,
  chatDeleteReducer,
} from "./chatReducers";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  documents: documentReducer,
  chatList: chatListReducer, // Handles listing chats
  chatDetails: chatDetailsReducer, // Handles single chat details
  chatCreate: chatCreateReducer, // Handles creating a new chat
  chatSendMessage: chatSendMessageReducer, // Handles sending a message
  chatDelete: chatDeleteReducer, // Handles deleting a chat
});

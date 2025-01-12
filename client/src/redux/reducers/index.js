import { combineReducers } from "redux";
import authReducer from "./authReducer"; // Import authReducer
import { userReducer } from "./userReducer";
import { documentReducer } from "./documentReducer";
import { chatListReducer } from "./chatReducers";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  documents: documentReducer,
  chats: chatListReducer,
});

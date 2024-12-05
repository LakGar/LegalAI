import { combineReducers } from "redux";
import authReducer from "./authReducer"; // Import authReducer
import { userReducer } from "./userReducer";
import { documentReducer } from "./documentReducer";

export default combineReducers({
  auth: authReducer, // Now we have the auth state in Redux
  user: userReducer,
  document: documentReducer,
});

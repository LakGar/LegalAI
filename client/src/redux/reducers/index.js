import { combineReducers } from "redux";
import authReducer from "./authReducer"; // Import authReducer

export default combineReducers({
  auth: authReducer, // Now we have the auth state in Redux
});

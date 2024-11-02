// redux/store.js
import { createStore, applyMiddleware } from "redux";
import { compose } from "redux"; // Use compose instead of devtools extension
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store with thunk middleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

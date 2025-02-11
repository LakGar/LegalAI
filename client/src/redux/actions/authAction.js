import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../constants/authConstants";

// Define the base API URL for the backend
const API_URL = "https://legalaiserver.vercel.app/api/auth";

// redux/actions/authActions.js
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../constants/authConstants";
import { useNavigate } from "react-router-dom";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    // Replace with your actual API URL
    const { data } = await axios.post("/api/auth/login", { email, password });

    // Store token in localStorage
    localStorage.setItem("token", data.token);

    // Dispatch success action with user data
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });

    // Navigate to the dashboard (protected route)
    const navigate = useNavigate();
    navigate("/dashboard");
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
  }
};

// redux/actions/authActions.js
export const logout = () => (dispatch) => {
  // Remove the token from localStorage
  localStorage.removeItem("token");

  // Dispatch the logout action
  dispatch({ type: LOGOUT });

  // Redirect to login page
  const navigate = useNavigate();
  navigate("/login");
};

// src/services/authService.js
import axios from "axios";

// Base URL for the API (adjust this to your backend's actual base URL)
const API_URL = "http://localhost:8000/api/auth";

// Axios instance to handle requests with credentials (cookies)
export const axiosInstance = axios.create({
  withCredentials: true, // This ensures cookies are sent with each request
});

// User Signup
export const signup = async (firstname, lastname, email, phone, password) => {
  const response = await axiosInstance.post(`${API_URL}/signup`, {
    firstname,
    lastname,
    email,
    phone,
    password,
  });
  return response.data;
};

// Email Verification
export const verifyEmail = async (code) => {
  const response = await axiosInstance.post(`${API_URL}/verify-email`, {
    code,
  });
  return response.data;
};

// User Login
export const login = async (email, password) => {
  const response = await axiosInstance.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

// Request Password Reset
export const resetPasswordRequest = async (email) => {
  const response = await axiosInstance.post(
    `${API_URL}/reset-password-request`,
    {
      email,
    }
  );
  return response.data;
};

// Reset Password
export const resetPassword = async (token, newPassword) => {
  const response = await axiosInstance.post(`${API_URL}/reset-password`, {
    token,
    newPassword,
  });
  return response.data;
};

// Logout User
export const logout = async () => {
  const response = await axiosInstance.post(`${API_URL}/logout`);
  return response.data;
};

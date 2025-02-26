import axios from "axios";

// const API_URL = "http://localhost:8000/api/users";
const API_URL = "https://legalaiserver.vercel.app/api/users";

/**
 * Get user details
 */
export const getUserDetails = async (token) => {
  const response = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Get user details by ID
 */
export const getUserById = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

/**
 * Update user details
 */
export const updateUserDetails = async (userData, token) => {
  const response = await axios.put(`${API_URL}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Delete user account
 */
export const deleteUserAccount = async (token) => {
  const response = await axios.delete(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Upload profile image
 */
export const uploadProfileImage = async (imageData, token) => {
  const response = await axios.post(`${API_URL}/profile-image`, imageData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

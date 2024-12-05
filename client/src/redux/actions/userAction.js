import {
  getUserDetails as getUserService,
  updateUserDetails as updateUserService,
  deleteUserAccount as deleteUserService,
  uploadProfileImage as uploadProfileService,
} from "../../services/userServices.js";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
} from "../constants/userConstants";

// Get user details
export const getUserDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const token = localStorage.getItem("token");
    const data = await getUserService(token);

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload: error.message || "Failed to fetch user details",
    });
  }
};

// Update user details
export const updateUserDetails = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const token = localStorage.getItem("token");
    const data = await updateUserService(userData, token);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: error.message || "Failed to update user details",
    });
  }
};

// Delete user account
export const deleteUserAccount = () => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const token = localStorage.getItem("token");
    await deleteUserService(token);

    dispatch({ type: DELETE_USER_SUCCESS });

    // Optional: Clear token after deletion
    localStorage.removeItem("token");
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      payload: error.message || "Failed to delete user account",
    });
  }
};

// Upload profile image
export const uploadProfileImage = (imageData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });

    const token = localStorage.getItem("token");
    const data = await uploadProfileService(imageData, token);

    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAILURE,
      payload: error.message || "Failed to upload profile image",
    });
  }
};

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

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case UPLOAD_IMAGE_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: { ...state.user, profileImage: action.payload.profileImage },
      };

    case DELETE_USER_SUCCESS:
      return { ...state, loading: false, user: null };

    case GET_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
    case UPLOAD_IMAGE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

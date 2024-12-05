import {
  DOCUMENT_REQUEST,
  DOCUMENT_SUCCESS,
  DOCUMENT_FAILURE,
  DOCUMENT_UPLOAD_SUCCESS,
  DOCUMENT_DELETE_SUCCESS,
  DOCUMENT_UPDATE_SUCCESS,
  SET_ACTIVE_DOCUMENT,
  CLEAR_ACTIVE_DOCUMENT,
} from "../constants/documentConstants";

const initialState = {
  documents: [],
  activeDocument: null, // Add activeDocument to the state
  loading: false,
  error: null,
};

export const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOCUMENT_REQUEST:
      return { ...state, loading: true, error: null };

    case DOCUMENT_SUCCESS:
      return { ...state, loading: false, documents: action.payload.data };

    case DOCUMENT_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        documents: [...state.documents, action.payload.data],
      };

    case DOCUMENT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        documents: state.documents.filter((doc) => doc._id !== action.payload),
        activeDocument:
          state.activeDocument?._id === action.payload
            ? null
            : state.activeDocument, // Clear activeDocument if deleted
      };

    case DOCUMENT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        documents: state.documents.map((doc) =>
          doc._id === action.payload.data._id ? action.payload.data : doc
        ),
        activeDocument:
          state.activeDocument?._id === action.payload.data._id
            ? action.payload.data
            : state.activeDocument, // Update activeDocument if it matches
      };

    case SET_ACTIVE_DOCUMENT:
      return { ...state, activeDocument: action.payload };

    case CLEAR_ACTIVE_DOCUMENT:
      return { ...state, activeDocument: null };

    case DOCUMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

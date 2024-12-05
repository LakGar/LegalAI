import {
  fetchDocuments,
  fetchDocumentById,
  uploadDocument,
  updateDocument,
  deleteDocument,
} from "../../services/documentService";

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

// Fetch all documents
export const getDocuments = () => async (dispatch) => {
  try {
    dispatch({ type: DOCUMENT_REQUEST });
    const data = await fetchDocuments();
    dispatch({ type: DOCUMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DOCUMENT_FAILURE, payload: error.message });
  }
};

// Fetch a single document by ID
export const getDocumentById = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOCUMENT_REQUEST });
    const data = await fetchDocumentById(id);
    dispatch({ type: DOCUMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DOCUMENT_FAILURE, payload: error.message });
  }
};

// Upload a new document
export const uploadNewDocument = (documentData) => async (dispatch) => {
  try {
    dispatch({ type: DOCUMENT_REQUEST });
    const data = await uploadDocument(documentData);
    dispatch({ type: DOCUMENT_UPLOAD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DOCUMENT_FAILURE, payload: error.message });
  }
};

// Update an existing document
export const updateExistingDocument = (id, updates) => async (dispatch) => {
  try {
    dispatch({ type: DOCUMENT_REQUEST });
    const data = await updateDocument(id, updates);
    dispatch({ type: DOCUMENT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DOCUMENT_FAILURE, payload: error.message });
  }
};

// Delete a document
export const deleteExistingDocument = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOCUMENT_REQUEST });
    await deleteDocument(id);
    dispatch({ type: DOCUMENT_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DOCUMENT_FAILURE, payload: error.message });
  }
};

// Set the active document
export const setActiveDocument = (document) => (dispatch) => {
  dispatch({ type: SET_ACTIVE_DOCUMENT, payload: document });
};

// Clear the active document
export const clearActiveDocument = () => (dispatch) => {
  dispatch({ type: CLEAR_ACTIVE_DOCUMENT });
};

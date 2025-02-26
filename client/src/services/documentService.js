import axios from "axios";

// const API_URL = "http://localhost:8000/api/documents";
const API_URL = "https://legalaiserver.vercel.app/api/documents";
/**
 * Fetch all documents for the logged-in user.
 * @returns {Promise<Object>}
 */
export const fetchDocuments = async () => {
  const response = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

/**
 * Fetch a single document by its ID.
 * @param {string} id - Document ID.
 * @returns {Promise<Object>}
 */
export const fetchDocumentById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

/**
 * Upload a new document.
 * @param {FormData} documentData - Form data containing file and metadata.
 * @returns {Promise<Object>}
 */
export const uploadDocument = async (documentData) => {
  const response = await axios.post(`${API_URL}`, documentData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

/**
 * Update an existing document.
 * @param {string} id - Document ID.
 * @param {Object} updates - Fields to update.
 * @returns {Promise<Object>}
 */
export const updateDocument = async (id, updates) => {
  const response = await axios.put(`${API_URL}/${id}`, updates, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

/**
 * Delete a document.
 * @param {string} id - Document ID.
 * @returns {Promise<Object>}
 */
export const deleteDocument = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

/**
 * Analyze a document.
 * @param {string} documentUrl - Document URL to analyze.
 * @returns {Promise<Object>}
 */
export const analyzeDocument = async (documentUrl, documentId) => {
  const response = await axios.post(
    `${API_URL}/analyze`,
    { documentUrl, documentId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

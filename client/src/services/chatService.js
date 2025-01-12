import axios from "axios";

export const getChats = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const { data } = await axios.get("/api/chat", config);
  return data;
};

export const getChat = async (chatId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const { data } = await axios.get(`/api/chat/${chatId}`, config);
  return data;
};

export const createChat = async (documentId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const { data } = await axios.post("/api/chat", { documentId }, config);
  return data;
};

export const sendMessage = async (chatId, content) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const { data } = await axios.post(
    `/api/chat/${chatId}/message`,
    { content },
    config
  );
  return data;
};

export const deleteChat = async (chatId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  await axios.delete(`/api/chat/${chatId}`, config);
};

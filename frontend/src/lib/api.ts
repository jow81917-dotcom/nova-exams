import axios from "axios";

const getApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_URL?.trim();

  if (configured) {
    return configured.replace(/\/+$/, "");
  }

  if (import.meta.env.DEV) {
    return "http://localhost:5000/api";
  }

  return "/api";
};

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

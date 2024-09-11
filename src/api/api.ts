import axios, { type AxiosInstance } from "axios";

export const createApiInstance = async (): Promise<AxiosInstance> => {
  const api = axios.create({
    baseURL: 'https://cacica-backend.onrender.com/api/v1',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json", // Use JSON for most requests
      // Authorization: `Bearer ${token}`,
    },
  });

/*   // Enable CORS for your API server
  api.interceptors.request.use(async (config) => {
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        // Handle authentication errors
        console.error("Authentication error:", error);
        // Redirect to login or refresh token
      }
      return Promise.reject(error);
    }
  ); */

  return api;
};
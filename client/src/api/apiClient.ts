import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  timeout: 10000,
});

// need to update the apiClient to include the token in the headers for authenticated requests
apiClient.interceptors.request.use(
  async (config) => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // e.g. https://api.goexports.com
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// OPTIONAL: attach Firebase token automatically
axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("authToken"); // or firebase getIdToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;

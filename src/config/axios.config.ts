import axios from "axios";
import { toast } from "react-toastify";
import eventEmitter from "./eventEmitter.config";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  undefined,
  function axiosRetryInterceptor(err) {
    if (!err.response) {
      toast.error("Network Error. Please try again.");
    }
    if (
      err.response.status === 401 &&
      err.response.config &&
      !err.response.config.url?.endsWith("/u")
    ) {
      eventEmitter.emit("unauthorized");
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;

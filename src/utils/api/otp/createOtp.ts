import axios from "@/config/axios.config";
import { AxiosError } from "axios";

export const createOtpForSignup = async (email: string) => {
  try {
    const response = await axios.post("/api/users/register-otp-gen", {
      email,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
    throw error;
  }
};

export const createOtpForAuth = async (email: string) => {
  try {
    const response = await axios.post("/api/users/auth-otp-gen", {
      email,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
    throw error;
  }
};

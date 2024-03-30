import axios from "@/config/axios.config";
import { AxiosError } from "axios";

export const createOtpForSignup = async (
  email: string
): Promise<
  | {
      success: boolean;
      message: string;
    }
  | undefined
> => {
  try {
    const response = await axios.post("/api/users/register-otp-gen", {
      email,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    console.error(error);
  }
};

export const createOtpForAuth = async (
  email: string
): Promise<
  | {
      success: boolean;
      message: string;
    }
  | undefined
> => {
  try {
    const response = await axios.post("/api/users/auth-otp-gen", {
      email,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    console.error(error);
  }
};

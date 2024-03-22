import { AxiosError } from "axios";
import axios from "../../config/axios.config";
import { UserType } from "@/types/User.type";

const readUser = async (): Promise<
  | {
      success: boolean;
      message: string;
      user?: UserType;
    }
  | undefined
> => {
  try {
    const response = await axios.request({
      method: "GET",
      url: "/api/users/u",
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data.message) {
        const errorMessage = error.response.data.message;
        throw errorMessage;
      }
    } else {
      console.error(error);
    }
  }
};

export default readUser;

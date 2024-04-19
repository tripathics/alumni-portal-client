import axios from "@/config/axios.config";
import { AxiosError } from "axios";

const updateAvatar = async (
  file: File
): Promise<
  | {
      success: boolean;
      message: string;
    }
  | undefined
> => {
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await axios.patch("/api/users/update-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    // Handle the error here
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
    console.error(error);
  }
};

export default updateAvatar;

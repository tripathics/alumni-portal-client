import { AxiosError } from "axios";
import axios from "../../../config/axios.config";

export interface UpdatePasswordFormData {
  email: string;
  password: string;
  confirmPassword: string;
}
const updatePassword = async (
  data: UpdatePasswordFormData
): Promise<{ id: string; email: string; role: string } | undefined> => {
  try {
    const response = await axios.request({
      method: "POST",
      url: "/api/users/update-password",
      data: data,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      console.error(error);
    }
  }
};

export default updatePassword;

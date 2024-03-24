import { AxiosError } from "axios";
import axios from "../../config/axios.config";

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
    switch ((error as AxiosError).response?.status) {
      case 400:
        throw (error as AxiosError<{ message: string }>).response?.data.message;
        break;
      case 401:
        console.error(error);
        break;
      default:
        console.error(error);
        break;
    }
  }
};

export default updatePassword;

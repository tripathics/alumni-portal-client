import { PersonalDetailsType } from "@/types/Profile.type";
import { AxiosError } from "axios";
import axios from "../../../config/axios.config";

const updateProfile = async (
  data: PersonalDetailsType
): Promise<
  | {
      success: boolean;
      message: string;
    }
  | undefined
> => {
  try {
    const response = await axios.request({
      method: "POST",
      url: "/api/users/update-profile",
      data: data,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
};

export default updateProfile;

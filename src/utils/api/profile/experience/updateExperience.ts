import { AxiosError } from "axios";
import axios from "../../../../config/axios.config";
import { ExperienceType } from "@/types/Profile.type";

const updateExperience = async (
  data: ExperienceType
): Promise<
  | {
      message: string;
      success: boolean;
    }
  | undefined
> => {
  try {
    const response = await axios.request({
      method: "POST",
      url: "/api/users/experience",
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

export default updateExperience;

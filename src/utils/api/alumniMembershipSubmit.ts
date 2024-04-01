import { AxiosError } from "axios";
import axios from "../../config/axios.config";

const alumniMembershipSubmit = async (
  data: FormData
): Promise<
  | {
      message: string;
      success: boolean;
    }
  | undefined
> => {
  try {
    const response = await axios.request({
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      url: "/api/alumni/membership",
      data: data,
    });
    return response.data;
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data.message || err.message);
    } else {
      console.error(error);
    }
  }
};

export default alumniMembershipSubmit;

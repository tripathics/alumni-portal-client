import { AxiosError } from "axios";
import axios from "../../config/axios.config";
import { MembershipPrefillDataType } from "@/types/Alumni.type";

const alumniPrefill = async (): Promise<
  MembershipPrefillDataType | undefined
> => {
  try {
    const response = await axios.request({
      method: "GET",
      url: "/api/alumni/membership-prefill",
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    if (err.response?.data.message) {
      throw new Error(err.response.data.message);
    }
  }
};

export default alumniPrefill;

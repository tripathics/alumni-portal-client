import axios from "@/config/axios.config";
import { AxiosError } from "axios";

const fetchApplicationById = async (id: string) => {
  try {
    const response = await axios.get(
      `/api/admin/membership-applications/${id}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
  }
};

export default fetchApplicationById;

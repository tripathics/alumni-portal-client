import axios from "@/config/axios.config";
import { MembershipApplicationType } from "@/types/Membership.type";
import { AxiosError } from "axios";

export const fetchApplicationByIdAdmin = async (
  id: string
): Promise<MembershipApplicationType | undefined> => {
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

export const fetchApplicationById = async (
  id: string
): Promise<MembershipApplicationType | undefined> => {
  try {
    const response = await axios.get(`/api/alumni/past-applications/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
  }
};

import axios from "@/config/axios.config";
import { AxiosError } from "axios";

export interface MembershipApplicationType {
  id: string;
  user_id: string;
  membership_level: string;
  sign: string;
  created_at: string;
  updated_at: string;
  status: "pending" | "approved" | "rejected";
  registration_no: string;
  roll_no: string;
  avatar: string;
  title: string;
  first_name: string;
  last_name: string;
  degree: string;
  discipline: string;
  graduation_date: string;
  enrollment_date: string;
}

export const fetchMembershipApplications = async (): Promise<
  MembershipApplicationType[] | undefined
> => {
  try {
    const response = await axios.get("/api/admin/membership-applications");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
  }
};

export const fetchUserMembershipApplications = async (): Promise<
  MembershipApplicationType[] | undefined
> => {
  try {
    const response = await axios.get("/api/alumni/past-applications");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
  }
};

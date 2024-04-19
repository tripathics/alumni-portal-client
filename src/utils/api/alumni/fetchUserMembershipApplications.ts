import axios from "@/config/axios.config";
import { AxiosError } from "axios";
import { MembershipApplicationOverviewType } from "@/types/Membership.type";

const fetchUserMembershipApplications = async (): Promise<
  MembershipApplicationOverviewType[] | undefined
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

export default fetchUserMembershipApplications;

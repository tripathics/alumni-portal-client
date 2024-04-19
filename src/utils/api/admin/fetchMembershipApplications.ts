import axios from "@/config/axios.config";
import { MembershipApplicationOverviewType } from "@/types/Membership.type";
import { AxiosError } from "axios";

const fetchMembershipApplications = async (): Promise<
  MembershipApplicationOverviewType[] | undefined
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

export default fetchMembershipApplications;

import axios from "@/config/axios.config";
import { MembershipLevelType } from "@/types/Membership.type";
import { AxiosError } from "axios";

const updateApplicationStatus = async (
  id: string,
  status: "approved" | "rejected"
): Promise<
  | {
      message: string;
      membershipApplicationRecord: {
        id: string;
        user_id: string;
        membership_level: MembershipLevelType;
        sign: string;
        created_at: string;
        updated_at: string;
        status: "approved" | "rejected" | "pending";
      };
    }
  | undefined
> => {
  try {
    const response = await axios.request({
      method: "PATCH",
      url: `/api/admin/membership-applications/${id}`,
      data: {
        id,
        status,
      },
    });
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      console.error(error);
    }
  }
};

export default updateApplicationStatus;

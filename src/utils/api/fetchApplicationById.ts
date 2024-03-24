import axios from "@/config/axios.config";
import { MembershipLevelType } from "@/types/Membership.type";
import { MembershipApplcationStatus } from "@/types/Membership.type";
import { CategoryType, SexType, TitleType } from "@/types/User.type";
import { AxiosError } from "axios";

export interface FullApplicationType {
  user_id: string;
  membership_level: MembershipLevelType;
  sign: string;
  created_at: string;
  updated_at: string;
  status: MembershipApplcationStatus;
  title: TitleType;
  first_name: string;
  last_name: string;
  dob: string;
  sex: SexType;
  category: CategoryType;
  nationality: string;
  religion: string;
  address: string;
  pincode: string;
  state: string;
  city: string;
  country: string;
  phone: string;
  alt_phone: string | null;
  alt_email: string | null;
  linkedin: string;
  github: string;
  registration_no: string;
  roll_no: string;
  avatar: string | null;
  email: string;
  degree: string;
  discipline: string;
  graduation_date: string;
  enrollment_date: string;
}

const fetchApplicationById = async (
  id: string
): Promise<FullApplicationType | undefined> => {
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

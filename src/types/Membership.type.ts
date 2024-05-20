import { CategoryType, SexType, TitleType } from "./User.type";

export type MembershipLevelType = "level1_networking" | "level2_volunteering";

export type MembershipApplcationStatus = "pending" | "approved" | "rejected";

export interface MembershipApplicationOverviewType {
  id: string;
  user_id: string;
  membership_level: MembershipLevelType;
  sign: string;
  created_at: string;
  updated_at: string;
  status: MembershipApplcationStatus;
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

export interface MembershipApplicationType {
  id: string;
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

export interface MembershipApplicationAcknowledgementType {
  id: string;
  user_id: string;
  membership_level: MembershipLevelType;
  sign: string;
  created_at: string;
  updated_at: string;
  status: MembershipApplcationStatus;
}

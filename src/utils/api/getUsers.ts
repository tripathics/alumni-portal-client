import axios from "@/config/axios.config";
import { TitleType, UserRole } from "@/types/User.type";
import { AxiosError } from "axios";

const getUsers = async (): Promise<
  | {
      users: {
        id: string;
        email: string;
        title: TitleType;
        first_name: string;
        last_name: string;
        avatar: string | null;
        role: UserRole[];
      }[];
    }
  | undefined
> => {
  try {
    const response = await axios.request({
      method: "GET",
      url: "/api/admin/users",
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
    console.error(error);
  }
};

export default getUsers;

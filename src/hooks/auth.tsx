import { useCallback, useState } from "react";
import { ProfileCompletionStatusType, UserType } from "../types/User.type";
import loginApi from "@/utils/api/auth/login";
import logoutApi from "@/utils/api/auth/logout";
import readUser from "@/utils/api/profile/readUser";
import { toast } from "react-toastify";
import getProfileCompletionStatus from "@/utils/api/profile/getProfileCompletionStatus";

const useAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [profileCompletionStatus, setProfileCompletionStatus] =
    useState<ProfileCompletionStatusType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const clearUser = () => {
    console.log("clearing user");
    setUser(null);
    setProfileCompletionStatus(null);
  };

  const fetchUser = useCallback(async () => {
    try {
      const response = await readUser();
      if (!response || !response.success || !response.user) {
        clearUser();
        return;
      }
      setUser(response.user);
      refreshProfileCompletionStatus();
    } catch (error) {
      if (typeof error === "string" && error !== "Token not found") {
        toast.error("Session expired");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (loginFormData: { email: string; password: string }) => {
    try {
      const data = await loginApi(loginFormData);
      if (data?.user) {
        setUser(data.user);
        const firstName = data.user.first_name;
        toast.dismiss();
        toast.success(
          firstName ? `Welcome back, ${firstName}!` : `Welcome back!`,
          {
            autoClose: 2000,
            closeButton: false,
            closeOnClick: true,
          }
        );
        refreshProfileCompletionStatus();
      }
    } catch (error) {
      throw error as string;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error(error);
    } finally {
      clearUser();
      toast.dismiss();
      toast.info("Logged out", {
        autoClose: 2000,
        closeButton: false,
        closeOnClick: true,
      });
    }
  };

  const refreshProfileCompletionStatus = async () => {
    try {
      const data = await getProfileCompletionStatus();
      if (data) setProfileCompletionStatus(data);
      console.log(data, profileCompletionStatus);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    fetchUser,
    clearUser,
    profileCompletionStatus,
    refreshProfileCompletionStatus,
  };
};

export default useAuth;

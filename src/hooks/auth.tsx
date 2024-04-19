import { useCallback, useState } from "react";
import { UserType } from "../types/User.type";
import loginApi from "@/utils/api/auth/login";
import logoutApi from "@/utils/api/auth/logout";
import readUser from "@/utils/api/profile/readUser";
import { toast } from "react-toastify";

const useAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const clearUser = () => {
    console.log("clearing user");
    setUser(null);
  };

  const fetchUser = useCallback(async () => {
    try {
      const response = await readUser();
      if (!response || !response.success || !response.user) {
        clearUser();
        return;
      }
      setUser(response.user);
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

  return {
    user,
    loading,
    login,
    logout,
    fetchUser,
    clearUser,
  };
};

export default useAuth;

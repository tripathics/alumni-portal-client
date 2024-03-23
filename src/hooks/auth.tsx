import { useCallback, useState } from "react";
import { UserType } from "../types/User.type";
import loginApi from "@/utils/api/login";
import logoutApi from "@/utils/api/logout";
import checkAuthApi from "@/utils/api/checkAuth";
import readUser from "@/utils/api/readUser";
import { toast } from "react-toastify";

const useAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [admin, setAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const clearUser = () => {
    setUser(null);
    setAdmin(false);
  };

  const fetchUser = useCallback(async () => {
    try {
      const response = await readUser();
      if (!response || !response.success || !response.user) {
        clearUser();
        return;
      }
      setUser(response.user);
      setAdmin(response.user.role.includes("admin"));
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
        setAdmin(data.user.role.includes("admin"));
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
      toast.info("Logged out", {
        autoClose: 2000,
        closeButton: false,
        closeOnClick: true,
      });
    }
  };

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const data = await checkAuthApi();
      if (!data?.success) {
        clearUser();
      } else {
        fetchUser();
      }
    } catch (error) {
      console.error(error);
      setUser(null);
      setAdmin(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [fetchUser]);

  return {
    user,
    admin,
    loading,
    login,
    logout,
    checkAuth,
    fetchUser,
    clearUser,
  };
};

export default useAuth;

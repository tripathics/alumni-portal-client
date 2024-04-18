import { createContext, useEffect } from "react";
import useAuth from "../hooks/auth";
import { UserContextType } from "../types/User.type";
import eventEmitter from "@/config/eventEmitter.config";
import { toast } from "react-toastify";

export const UserContext = createContext<UserContextType>({
  user: null,
  loading: false,
  login: async () => {},
  logout: async () => {},
  fetchUser: async () => {},
});

export const UserProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { fetchUser, loading, login, logout, user, clearUser } = useAuth();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    eventEmitter.on("unauthorized", () => {
      if (user) {
        clearUser();
        toast.error("Session expired");
      }
    });
    return () => {
      eventEmitter.off("unauthorized");
    };
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loading, fetchUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

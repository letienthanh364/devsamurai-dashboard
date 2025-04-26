import { User } from "@/types/user/user.type";
import { getObjectCookie } from "@/utils/auth.util";
import { getCookie } from "cookies-next";
import { create } from "zustand";

interface IAppStore {
  user: User | null;
  setUser: (params: User | null) => void;

  isAuthenticated: boolean;
  setIsAuthenticated: (params: boolean) => void;

  clearAllData: () => void;
}
const useAppStore = create<IAppStore>()((set) => ({
  user: getObjectCookie("user_profile"),
  setUser: (value: User | null) => {
    set((state) => ({ ...state, user: value }));
  },

  isAuthenticated: Boolean(getCookie("access_token")),
  setIsAuthenticated: (value: boolean) => {
    set((state) => ({ ...state, isAuthenticated: value }));
  },

  clearAllData: () => {},
}));

export default useAppStore;

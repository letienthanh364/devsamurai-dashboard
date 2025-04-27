import { User } from "@/types/user/user.type";
import { create } from "zustand";

interface IAppStore {
  user: User | null;
  setUser: (params: User | null) => void;

  isAuthenticated: boolean;
  setIsAuthenticated: (params: boolean) => void;

  isInitialized: boolean;
  setInitialized: (initialized: boolean) => void;

  clearAllData: () => void;
}

// Create the store without accessing cookies in the initial state
const useAppStore = create<IAppStore>()((set) => ({
  user: null,
  setUser: (value: User | null) => {
    set((state) => ({ ...state, user: value }));
  },

  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {
    set((state) => ({ ...state, isAuthenticated: value }));
  },

  isInitialized: false,
  setInitialized: (initialized: boolean) => {
    set((state) => ({ ...state, isInitialized: initialized }));
  },

  clearAllData: () => {
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAppStore;

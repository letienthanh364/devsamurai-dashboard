import { create } from "zustand";

// Define the type for your store state
interface SidebarState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const useDashBoardSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useDashBoardSidebarStore;

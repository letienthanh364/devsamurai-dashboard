import DashBoardSidebar from "@/sections/DashBoard/_components/DashBoardSidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="py-8 w-full">
      <DashBoardSidebar />
      <div className="w-full flex flex-col items-center justify-center p-2">
        {children}
      </div>
    </div>
  );
}

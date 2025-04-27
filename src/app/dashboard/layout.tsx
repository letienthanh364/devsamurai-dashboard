import DashBoardLayout from "@/sections/DashBoard/_components/DashBoardLayout";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <DashBoardLayout>{children}</DashBoardLayout>;
}

import React, { ReactNode } from "react";
import DashBoardSidebar from "../DashBoardSidebar";
import DashBoardHeader from "../DashBoardHeader";

interface DashBoardLayoutProps {
  children: ReactNode;
}

export default function DashBoardLayout({ children }: DashBoardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden w-[100vw]">
      <div className="flex flex-row gap-0 w-full justify-start transition-all duration-300 ease-in-out">
        <DashBoardSidebar />
        <div className="flex-grow flex flex-col">
          <DashBoardHeader />
          <div className="flex-1 transition-all duration-300 ease-in-out overflow-auto custom-scrollbar">
            {children}
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

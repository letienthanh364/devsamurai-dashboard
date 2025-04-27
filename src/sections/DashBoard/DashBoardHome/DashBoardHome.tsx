"use client";

import ExtendDateRangePicker from "@/components/dates/ExtendDateRangePicker";
import { Button } from "@/components/ui/button";
import AuthServices from "@/services/auth.service";
import React from "react";
import DashBoardChart from "../_components/DashBoardChart";
import DashBoardContact from "../_components/DashBoardContact/DashBoardContact";
import useDashBoardHome from "./useDashBoardHome.hook";
import { cn } from "@/lib/utils";

export default function DashBoardHome() {
  const {
    CustomTooltip,
    tabs,
    handleTabClick,
    selectedTab,
    setEndDate,
    endDate,
    setStartDate,
    startDate,
    chartData,
    setActiveTab,
    totals,
    activeTab,
  } = useDashBoardHome();
  return (
    <div className="flex flex-col gap-0 custom-scrollbar">
      <div className="relative flex h-12 items-center justify-start gap-2 border-b border-border-common px-6">
        <div className="flex">
          {tabs.map((tab) => {
            const isActive = selectedTab === tab;
            return (
              <Button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={cn(
                  " h-12 flex items-center justify-center !px-0 border-b border-border-common text-sm !rounded-none transition-none ",
                  {
                    "font-medium !text-text-primary border-gray-200": isActive,
                    "!text-muted-foreground": !isActive,
                  }
                )}
              >
                <p className="hover:bg-bg-hovering py-1 px-2 rounded-md">
                  {tab}
                </p>
              </Button>
            );
          })}
        </div>
        <ExtendDateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChangeStartDate={setStartDate}
          onChangeEndDate={setEndDate}
          className="!text-text-primary hover:!bg-bg-hovering !font-normal !py-2 !px-4 !rounded-lg !min-w-52"
        />
      </div>
      <div className="p-6 flex justify-center">
        <DashBoardChart
          CustomTooltip={CustomTooltip}
          activeTab={activeTab}
          chartData={chartData}
          setActiveTab={setActiveTab}
          totals={totals}
        />
      </div>
      <div className="p-6 flex w-full justify-center">
        <DashBoardContact />
      </div>
    </div>
  );
}

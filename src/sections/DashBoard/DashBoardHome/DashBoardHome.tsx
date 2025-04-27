"use client";

import ExtendDateRangePicker from "@/components/dates/ExtendDateRangePicker";
import { Button } from "@/components/ui/button";
import AuthServices from "@/services/auth.service";
import React from "react";
import DashBoardChart from "../_components/DashBoardChart";
import DashBoardContact from "../_components/DashBoardContact/DashBoardContact";
import useDashBoardHome from "./useDashBoardHome.hook";

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
    <div className="flex flex-col gap-0 overflow-auto h-screen">
      {" "}
      <div className="relative flex h-12 items-center justify-start gap-2 border-b px-6">
        <div className="flex border-t border-b border-gray-200 bg-white">
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`
                relative h-12 px-2 py-1 text-sm !rounded-none z-10 !border-t-0 !border-x-0
                ${
                  selectedTab === tab
                    ? "font-medium !text-foreground border-b-2 !border-black"
                    : "!text-muted-foreground border-b-2 !border-transparent"
                }
                transition-none focus:outline-none
              `}
            >
              {tab}
            </Button>
          ))}
        </div>
        <ExtendDateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChangeStartDate={setStartDate}
          onChangeEndDate={setEndDate}
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

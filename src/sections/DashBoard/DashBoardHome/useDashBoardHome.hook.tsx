import { useExtendDateRangePicker } from "@/components/dates/ExtendDateRangePicker/useExtendDateRangePicker.hook";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { TooltipProps } from "recharts";
import { mock_ContactData } from "./mock";

export interface DataItem {
  date: string;
  people: number;
  companies: number;
}

// Initial mock data

// Function to format date objects to our string format
function formatDate(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

const useDashBoardHome = () => {
  const [selectedTab, setSelectedTab] = useState<string>("30d");
  const [activeTab, setActiveTab] = useState<string>("companies");
  const [chartData, setChartData] = useState<DataItem[]>([]);
  const [totals, setTotals] = useState<{ people: number; companies: number }>({
    people: 0,
    companies: 0,
  });

  const { propsDateRangePicker } = useExtendDateRangePicker({
    shouldShowControlButtons: true,
  });

  const { startDate, endDate, setStartDate, setEndDate } = propsDateRangePicker;

  const tabs = ["1d", "3d", "7d", "30d", "Custom"];

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TooltipProps<any, any>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black p-2 border rounded-lg space-y-1 w-40 text-xs">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div
                  className={cn("w-3 h-3 rounded", {
                    "bg-[#3b82f6]": entry.dataKey === "people",
                    "bg-[#10b981]": entry.dataKey === "companies",
                  })}
                />
                <p>Contacts</p>
              </div>
              <p className="">{entry.value}</p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const getDateRangeForTab = useCallback(
    (tab: string, refDate = new Date()): { startDate: Date; endDate: Date } => {
      let newStartDate: Date, newEndDate: Date;

      switch (tab) {
        case "1d":
          // For 1 day, show just the current day
          newStartDate = new Date(refDate);
          newStartDate.setHours(0, 0, 0, 0);
          newEndDate = new Date(refDate);
          newEndDate.setHours(23, 59, 59, 999);
          break;
        case "3d":
          // For 3 days, show 1 day before and 1 day after current
          newStartDate = new Date(refDate);
          newStartDate.setDate(refDate.getDate() - 1);
          newStartDate.setHours(0, 0, 0, 0);
          newEndDate = new Date(refDate);
          newEndDate.setDate(refDate.getDate() + 1);
          newEndDate.setHours(23, 59, 59, 999);
          break;
        case "7d":
          // For 7 days, show 3 days before and 3 days after
          newStartDate = new Date(refDate);
          newStartDate.setDate(refDate.getDate() - 3);
          newStartDate.setHours(0, 0, 0, 0);
          newEndDate = new Date(refDate);
          newEndDate.setDate(refDate.getDate() + 3);
          newEndDate.setHours(23, 59, 59, 999);
          break;
        case "30d":
          newStartDate = new Date(refDate);
          newStartDate.setDate(refDate.getDate() - 15);
          newStartDate.setHours(0, 0, 0, 0);
          newEndDate = new Date(refDate);
          newEndDate.setDate(refDate.getDate() + 14);
          newEndDate.setHours(23, 59, 59, 999);
          break;
        case "Custom":
          if (!startDate || !endDate) {
            return getDateRangeForTab("30d", refDate);
          }
          return {
            startDate: (startDate as unknown as { $d: Date }).$d,
            endDate: (endDate as unknown as { $d: Date }).$d,
          };
        default:
          // Default to 30d range
          return getDateRangeForTab("30d", refDate);
      }

      return { startDate: newStartDate, endDate: newEndDate };
    },
    [endDate, startDate]
  );

  // Function to create complete dataset with all dates in range
  const createCompleteDataset = (
    startDate: Date,
    endDate: Date,
    sourceData: DataItem[]
  ): DataItem[] => {
    const result: DataItem[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      const formattedDate = formatDate(current);

      // Find if we have real data for this date
      const existingItem = sourceData.find(
        (item) => item.date === formattedDate
      );

      if (existingItem) {
        result.push(existingItem);
      } else {
        // Add empty data for this date
        result.push({
          date: formattedDate,
          people: 0,
          companies: 0,
        });
      }

      // Move to next day
      current.setDate(current.getDate() + 1);
    }

    return result;
  };
  const handleTabClick = (tab: string): void => {
    setSelectedTab(tab);

    if (tab !== "Custom") {
      const { startDate: newStartDate, endDate: newEndDate } =
        getDateRangeForTab(tab);

      // Use the actual dayjs constructor to create proper dayjs objects
      if (setStartDate && typeof setStartDate === "function") {
        import("dayjs").then((dayjsModule) => {
          const dayjs = dayjsModule.default;
          const newStartDateDayjs = dayjs(newStartDate);
          setStartDate(newStartDateDayjs);
        });
      }

      if (setEndDate && typeof setEndDate === "function") {
        import("dayjs").then((dayjsModule) => {
          const dayjs = dayjsModule.default;
          const newEndDateDayjs = dayjs(newEndDate);
          setEndDate(newEndDateDayjs);
        });
      }
    }
  };

  useEffect(() => {
    // Get current date range based on selected tab
    const dateRange = getDateRangeForTab(selectedTab);

    // Create complete dataset with all dates in range
    const completeData = createCompleteDataset(
      dateRange.startDate,
      dateRange.endDate,
      mock_ContactData
    );

    // Calculate totals
    const newTotals = completeData.reduce(
      (acc, item) => ({
        people: acc.people + item.people,
        companies: acc.companies + item.companies,
      }),
      { people: 0, companies: 0 }
    );

    setChartData(completeData);
    setTotals(newTotals);
  }, [selectedTab, startDate, endDate, getDateRangeForTab]);
  return {
    tabs,
    CustomTooltip,
    handleTabClick,
    selectedTab,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setActiveTab,
    chartData,
    totals,
    activeTab,
  };
};
export default useDashBoardHome;

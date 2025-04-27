import { useExtendDateRangePicker } from "@/components/dates/ExtendDateRangePicker/useExtendDateRangePicker.hook";
import { useCallback, useEffect, useState } from "react";
import { TooltipProps } from "recharts";

export interface DataItem {
  date: string;
  people: number;
  companies: number;
}

// Initial mock data
const mockData: DataItem[] = [
  { date: "Mar 18", people: 2, companies: 4 },
  { date: "Mar 21", people: 1, companies: 6 },
  { date: "Mar 23", people: 2, companies: 4 },
  { date: "Mar 25", people: 0, companies: 2 },
  { date: "Mar 28", people: 1, companies: 4 },
  { date: "Apr 1", people: 3, companies: 8 },
  { date: "Apr 3", people: 0, companies: 2 },
  { date: "Apr 5", people: 1, companies: 2 },
  { date: "Apr 9", people: 2, companies: 6 },
  { date: "Apr 13", people: 2, companies: 2 },
  { date: "Apr 14", people: 0, companies: 2 },
  { date: "Apr 15", people: 0, companies: 2 },
  { date: "Apr 16", people: 0, companies: 2 },
  { date: "Apr 17", people: 0, companies: 2 },
];

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
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md text-xs">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color || entry.stroke }}>
              {entry.dataKey === "people" ? "People" : "Companies"}:{" "}
              {entry.value}
            </p>
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
      mockData
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

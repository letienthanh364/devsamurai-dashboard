import { Dispatch, SetStateAction } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  TooltipProps,
} from "recharts";
import { DataItem } from "../../DashBoardHome/useDashBoardHome.hook";

interface Chart_props {
  setActiveTab: Dispatch<SetStateAction<string>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CustomTooltip: React.FC<TooltipProps<any, any>>;
  chartData: DataItem[];
  activeTab: string;
  totals: {
    people: number;
    companies: number;
  };
}

export default function DashBoardChart({
  setActiveTab,
  CustomTooltip,
  activeTab,
  chartData,
  totals,
}: Chart_props) {
  return (
    <div className="rounded-xl border bg-card shadow w-full max-w-6xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <h3 className="font-semibold tracking-tight text-base text-left">
            Lead generation
          </h3>
          <p className="text-sm text-muted-foreground text-left">
            New contacts added to the pool.
          </p>
        </div>

        {/* Tabs section */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("people")}
            data-active={activeTab === "people"}
            className={`relative z-10 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6 ${
              activeTab === "people" ? "bg-gray-100" : ""
            }`}
          >
            <span className="text-xs text-gray-500">People</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {totals.people}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("companies")}
            data-active={activeTab === "companies"}
            className={`relative z-10 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6 ${
              activeTab === "companies" ? "bg-gray-100" : ""
            }`}
          >
            <span className="text-xs text-gray-500">Companies</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {totals.companies}
            </span>
          </button>
        </div>
      </div>

      {/* Chart section */}
      <div className="p-6 px-2 ">
        <div className="flex justify-center text-xs h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                dy={8}
                tick={{ fill: "#666", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey={activeTab}
                fill={activeTab === "people" ? "#3b82f6" : "#10b981"}
                radius={0}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

import dayjs from "dayjs";
import { useState, useCallback } from "react";
import { useDateRangePicker } from "../custom-date-range-picker";

const filterOptions = ["today", "weekly", "monthly"] as const;

interface UseExtendDateRangePickerProps {
  shouldShowControlButtons?: boolean;
}

export interface UseExtendDateRangePickerReturn {
  shouldShowControlButtons: boolean;
  onClickPreviousDateRange: () => void;
  onClickNextDateRange: () => void;
  selectedDateRange: "today" | "weekly" | "monthly" | null;
  handleDateRangeOptions: (option: "today" | "weekly" | "monthly") => void;
  filterOptions: readonly ["today", "weekly", "monthly"];
}

export const useExtendDateRangePicker = ({
  shouldShowControlButtons = false,
}: UseExtendDateRangePickerProps) => {
  const { ...propsDateRangePicker } = useDateRangePicker({
    start: dayjs(),
    end: dayjs(),
  });
  const { setEndDate, setStartDate, onReset } = propsDateRangePicker;

  // ! Date range options
  const [selectedDateRange, setSelectedDateRange] = useState<
    (typeof filterOptions)[number] | null
  >("today");

  // ! handle all
  const handleAll = useCallback(() => {
    onReset();
  }, [onReset]);

  // ! Function  Today
  const handleToday = useCallback(() => {
    const today = dayjs();
    setStartDate(today);
    setEndDate(today);
  }, [setStartDate, setEndDate]);

  //! Function  Weekly
  const handleWeekly = useCallback(() => {
    const startOfWeek = dayjs().startOf("week");
    const endOfWeek = dayjs().endOf("week");
    setStartDate(startOfWeek);
    setEndDate(endOfWeek);
  }, [setStartDate, setEndDate]);

  //! Function  Monthly
  const handleMonthly = useCallback(() => {
    const startOfMonth = dayjs().startOf("month");
    const endOfMonth = dayjs().endOf("month");
    setStartDate(startOfMonth);
    setEndDate(endOfMonth);
  }, [setStartDate, setEndDate]);

  // ! handle choose option
  const handleDateRangeOptions = (option: "today" | "weekly" | "monthly") => {
    // If the same option is selected, reset to null and call handleAll
    if (selectedDateRange === option) {
      setSelectedDateRange(null);
      handleAll();
    } else {
      // Otherwise, apply the selected filter
      setSelectedDateRange(option);
      switch (option) {
        case "today":
          handleToday();
          break;
        case "weekly":
          handleWeekly();
          break;
        case "monthly":
          handleMonthly();
          break;
        default:
          handleAll();
          break;
      }
    }
  };

  const adjustDateRange = useCallback(
    (direction: "previous" | "next") => {
      const amount = direction === "previous" ? -1 : 1;

      const updateDateRange = (unit: "week" | "month") => {
        setStartDate((prev) =>
          prev
            ? prev.add(amount, unit).startOf(unit)
            : dayjs().add(amount, unit).startOf(unit)
        );
        setEndDate((prev) =>
          prev
            ? prev.add(amount, unit).endOf(unit)
            : dayjs().add(amount, unit).endOf(unit)
        );
      };

      switch (selectedDateRange) {
        case "today":
          setStartDate((prev) =>
            prev ? prev.add(amount, "day") : dayjs().add(amount, "day")
          );
          setEndDate((prev) =>
            prev ? prev.add(amount, "day") : dayjs().add(amount, "day")
          );
          break;
        case "weekly":
          updateDateRange("week");
          break;
        case "monthly":
          updateDateRange("month");
          break;
        default:
          setStartDate(dayjs());
          setEndDate(dayjs());
          setSelectedDateRange("today");

          break;
      }
    },
    [selectedDateRange, setStartDate, setEndDate]
  );

  const onClickPreviousDateRange = () => adjustDateRange("previous");
  const onClickNextDateRange = () => adjustDateRange("next");

  const propsExtendDateRangePicker = {
    shouldShowControlButtons,
    onClickPreviousDateRange,
    onClickNextDateRange,
    selectedDateRange,
    handleDateRangeOptions,
    filterOptions,
  };

  return {
    propsDateRangePicker,
    propsExtendDateRangePicker,
  };
};

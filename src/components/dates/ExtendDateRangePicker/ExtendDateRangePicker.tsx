import type { ButtonProps } from "@mui/material";

import { useState } from "react";

import { Button, IconButton } from "@mui/material";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";

import { CustomDateRangePicker } from "../custom-date-range-picker";
import { NullableDayjs } from "@/types/_commons/date.type";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  startDate: NullableDayjs;
  onChangeStartDate: (newValue: NullableDayjs) => void;
  endDate: NullableDayjs;
  onChangeEndDate: (newValue: NullableDayjs) => void;
  applySearch?: () => void;
  minDate?: NullableDayjs | undefined;
  maxDate?: NullableDayjs | undefined;
  className?: string;
  buttonProps?: ButtonProps;
  shouldShowControlButtons?: boolean;
  onClickPreviousDateRange?: () => void;
  onClickNextDateRange?: () => void;
}

export default function ExtendDateRangePicker({
  applySearch,
  className,
  buttonProps,
  shouldShowControlButtons = false,
  onClickPreviousDateRange,
  onClickNextDateRange,
  ...rest
}: Props) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const { startDate, endDate } = rest;

  return (
    <>
      <div className="relative flex gap-2 items-center justify-center">
        {shouldShowControlButtons && (
          <IconButton onClick={onClickPreviousDateRange}>
            <ChevronLeftRounded />
          </IconButton>
        )}
        <Button
          id="custom-button"
          type="button"
          variant="outlined"
          onClick={() => setDatePickerOpen(true)}
          className={cn(
            " !bg-white rounded-lg border !border-[#d5d6d9] justify-center items-center gap-1 !flex !normal-case",
            className
          )}
          {...buttonProps}
        >
          <CalendarIcon className="text-foreground h-4 w-4" />
          <div className="px-0.5 justify-center items-center flex">
            <div className="text-foreground   leading-tight text-sm ">
              {startDate ? startDate?.format("MMM D, YYYY") : "Start Date"} –{" "}
              {endDate ? endDate?.format("MMM D, YYYY") : "End Date"}
            </div>
          </div>
        </Button>
        {shouldShowControlButtons && (
          <IconButton onClick={onClickNextDateRange}>
            <ChevronRightRounded />
          </IconButton>
        )}
      </div>

      <CustomDateRangePicker
        variant="calendar"
        open={datePickerOpen}
        onClose={() => {
          setDatePickerOpen(false);

          if (applySearch) {
            applySearch();
          }
        }}
        shouldShowControlButtons={shouldShowControlButtons}
        onClickPreviousDateRange={onClickPreviousDateRange}
        onClickNextDateRange={onClickNextDateRange}
        {...rest}
      />
    </>
  );
}

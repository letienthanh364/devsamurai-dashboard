import { useState, useCallback } from "react";

import type {
  UseDateRangePickerProps,
  UseDateRangePickerReturn,
} from "./types";
import { NullableDayjs } from "@/types/_commons/date.type";
import { fDateRangeShortLabel, fIsAfter } from "@/utils/formatTime.util";

// ----------------------------------------------------------------------

export function useDateRangePicker({
  end,
  start,
  maxDate,
  minDate,
}: UseDateRangePickerProps): UseDateRangePickerReturn {
  const [open, setOpen] = useState(false);

  const [endDate, setEndDate] = useState(end as NullableDayjs);

  const [startDate, setStartDate] = useState(start as NullableDayjs);

  const error = fIsAfter(startDate, endDate);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onChangeStartDate = useCallback((newValue: NullableDayjs) => {
    setStartDate(newValue);
  }, []);

  const onChangeEndDate = useCallback(
    (newValue: NullableDayjs) => {
      if (error) {
        setEndDate(null);
      }
      setEndDate(newValue);
    },
    [error]
  );

  const onReset = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);

  return {
    startDate: startDate as NullableDayjs,
    endDate: endDate as NullableDayjs,
    minDate,
    maxDate,
    onChangeStartDate,
    onChangeEndDate,
    //
    open,
    onOpen,
    onClose,
    onReset,
    //
    selected: !!startDate && !!endDate,
    error,
    //
    label: fDateRangeShortLabel(startDate, endDate, true),
    shortLabel: fDateRangeShortLabel(startDate, endDate),
    //
    setStartDate,
    setEndDate,
  };
}

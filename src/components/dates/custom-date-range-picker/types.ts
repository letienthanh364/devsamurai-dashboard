// ----------------------------------------------------------------------

import { NullableDayjs } from "@/types/_commons/date.type";

// ----------------------------------------------------------------------

export type UseDateRangePickerReturn = {
  startDate: NullableDayjs;
  endDate: NullableDayjs;
  minDate?: NullableDayjs;
  maxDate?: NullableDayjs;
  onChangeStartDate: (newValue: NullableDayjs) => void;
  onChangeEndDate: (newValue: NullableDayjs) => void;
  //
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReset: () => void;
  //
  selected?: boolean;
  error?: boolean;
  //
  label?: string;
  shortLabel?: string;
  //
  title?: string;
  variant?: "calendar" | "input";
  //
  setStartDate: React.Dispatch<React.SetStateAction<NullableDayjs>>;
  setEndDate: React.Dispatch<React.SetStateAction<NullableDayjs>>;
  //
  shouldShowControlButtons?: boolean;
  onClickPreviousDateRange?: () => void;
  onClickNextDateRange?: () => void;
};

export type UseDateRangePickerProps = {
  start: NullableDayjs;
  end: NullableDayjs;
  minDate?: NullableDayjs;
  maxDate?: NullableDayjs;
};

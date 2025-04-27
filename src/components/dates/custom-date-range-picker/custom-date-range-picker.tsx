import type { Dayjs } from "dayjs";
import { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { IconButton, Box } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormHelperText from "@mui/material/FormHelperText";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  ChevronLeftRounded,
  ChevronRightRounded,
  KeyboardArrowDown,
} from "@mui/icons-material";

import type { UseDateRangePickerReturn } from "./types";
import { styled } from "@mui/material/styles";
import { fIsAfter } from "@/utils/formatTime.util";

// ----------------------------------------------------------------------
const StyledDateCalendar = styled(DateCalendar)(() => ({
  // Style for the selected day - black square with white text
  "& .MuiPickersDay-root.Mui-selected": {
    backgroundColor: "#000000",
    color: "#ffffff",
    borderRadius: "4px", // Square with slightly rounded corners
    "&:hover": {
      backgroundColor: "#000000", // Stay black on hover
    },
    "&:focus": {
      backgroundColor: "#000000", // Stay black on focus
    },
  },

  // Calendar layout and spacing adjustments
  "& .MuiDayCalendar-header": {
    justifyContent: "space-between",
    "& .MuiTypography-root": {
      width: "40px",
      margin: 0,
    },
  },

  "& .MuiPickersDay-root": {
    margin: "0px",
    width: "40px",
    height: "40px",
  },

  // Hide the default header
  "& .MuiPickersCalendarHeader-root": {
    display: "none",
  },

  // Style for today if needed
  "& .MuiPickersDay-today": {
    border: "1px solid rgba(0, 0, 0, 0.3)",
  },

  // Override hover effect for other days
  "& .MuiPickersDay-root:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },

  // Style for days from other months
  "& .MuiPickersDay-dayOutsideMonth": {
    color: "#aaaaaa",
  },
}));

// Custom Calendar Header
const CalendarHeader = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 8px 16px 8px",
}));

const MonthSelector = styled(Button)(() => ({
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "16px",
  color: "black",
  padding: "4px 8px",
}));

// Apply button
const ApplyButton = styled(Button)(() => ({
  backgroundColor: "black",
  color: "white",
  fontWeight: "bold",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#333333",
  },
}));

export function CustomDateRangePicker({
  open,
  endDate,
  onClose,
  startDate,
  onChangeEndDate,
  variant = "input",
  onChangeStartDate,
  title,
  minDate,
  maxDate,
  shouldShowControlButtons,
  onClickPreviousDateRange,
  onClickNextDateRange,
}: Omit<
  UseDateRangePickerReturn,
  "onOpen" | "onReset" | "setStartDate" | "setEndDate"
>) {
  const isCalendarView = variant === "calendar";

  const [tempStartDate, setTempStartDate] = useState<Dayjs | null>(startDate);
  const [tempEndDate, setTempEndDate] = useState<Dayjs | null>(endDate);
  const [startMonth, setStartMonth] = useState<string>(
    startDate ? startDate.format("MMMM YYYY") : ""
  );
  const [endMonth, setEndMonth] = useState<string>(
    endDate ? endDate.format("MMMM YYYY") : ""
  );
  // Add the missing state variables

  const error = fIsAfter(tempStartDate, tempEndDate);

  // Update the month displays when dates change
  useEffect(() => {
    if (tempStartDate) {
      setStartMonth(tempStartDate.format("MMMM YYYY"));
    }
    if (tempEndDate) {
      setEndMonth(tempEndDate.format("MMMM YYYY"));
    }
  }, [tempStartDate, tempEndDate]);

  const handleApply = useCallback(() => {
    onChangeStartDate(tempStartDate);
    onChangeEndDate(tempEndDate);
    onClose();
  }, [tempStartDate, tempEndDate, onChangeStartDate, onChangeEndDate, onClose]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const handlePreviousMonth = (isStart: boolean) => {
    if (isStart && tempStartDate) {
      setTempStartDate(tempStartDate.subtract(1, "month"));
    } else if (!isStart && tempEndDate) {
      setTempEndDate(tempEndDate.subtract(1, "month"));
    }
  };

  const handleNextMonth = (isStart: boolean) => {
    if (isStart && tempStartDate) {
      setTempStartDate(tempStartDate.add(1, "month"));
    } else if (!isStart && tempEndDate) {
      setTempEndDate(tempEndDate.add(1, "month"));
    }
  };

  useEffect(() => {
    setTempStartDate(startDate);
  }, [startDate]);

  useEffect(() => {
    setTempEndDate(endDate);
  }, [endDate]);

  return (
    <Dialog
      fullWidth
      maxWidth={isCalendarView ? false : "xs"}
      open={open}
      onClose={handleCancel}
      PaperProps={{
        sx: {
          ...(isCalendarView && { maxWidth: 720 }),
          borderRadius: "8px",
        },
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      <DialogContent sx={{ ...(isCalendarView && { overflow: "unset" }) }}>
        <Stack
          justifyContent="center"
          spacing={isCalendarView ? 3 : 2}
          direction={isCalendarView ? "row" : "column"}
          sx={{ pt: 1 }}
        >
          {isCalendarView ? (
            <div className="flex flex-col gap-3">
              {shouldShowControlButtons && (
                <div className="flex w-full items-center justify-between">
                  <IconButton onClick={onClickPreviousDateRange}>
                    <ChevronLeftRounded />
                  </IconButton>
                  <IconButton onClick={onClickNextDateRange}>
                    <ChevronRightRounded />
                  </IconButton>
                </div>
              )}

              <div className="flex items-center justify-center gap-4">
                <Paper
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    borderColor: "divider",
                    borderStyle: "dashed",
                    overflow: "hidden",
                  }}
                >
                  <CalendarHeader>
                    <MonthSelector
                      endIcon={<KeyboardArrowDown />}
                      onClick={() => {}}
                    >
                      {startMonth}
                    </MonthSelector>
                    <div>
                      <IconButton
                        size="small"
                        onClick={() => handlePreviousMonth(true)}
                      >
                        <ChevronLeftRounded />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleNextMonth(true)}
                      >
                        <ChevronRightRounded />
                      </IconButton>
                    </div>
                  </CalendarHeader>

                  <StyledDateCalendar
                    value={tempStartDate}
                    onChange={setTempStartDate}
                    minDate={minDate as Dayjs | undefined}
                    maxDate={maxDate as Dayjs | undefined}
                  />
                </Paper>

                <Paper
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    borderColor: "divider",
                    borderStyle: "dashed",
                    overflow: "hidden",
                  }}
                >
                  <CalendarHeader>
                    <MonthSelector
                      endIcon={<KeyboardArrowDown />}
                      onClick={() => {}}
                    >
                      {endMonth}
                    </MonthSelector>
                    <div>
                      <IconButton
                        size="small"
                        onClick={() => handlePreviousMonth(false)}
                      >
                        <ChevronLeftRounded />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleNextMonth(false)}
                      >
                        <ChevronRightRounded />
                      </IconButton>
                    </div>
                  </CalendarHeader>

                  <StyledDateCalendar
                    value={tempEndDate}
                    onChange={setTempEndDate}
                    minDate={minDate as Dayjs | undefined}
                    maxDate={maxDate as Dayjs | undefined}
                  />
                </Paper>
              </div>
            </div>
          ) : (
            <>{/* Input variant code remains unchanged */}</>
          )}
        </Stack>

        {error && (
          <FormHelperText error sx={{ px: 2 }}>
            End date error
          </FormHelperText>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <ApplyButton disabled={error} variant="contained" onClick={handleApply}>
          APPLY
        </ApplyButton>
      </DialogActions>
    </Dialog>
  );
}

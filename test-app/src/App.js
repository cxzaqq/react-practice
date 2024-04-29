import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/ko";
import { MonthCalendar, YearCalendar } from "@mui/x-date-pickers";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventIcon from "@mui/icons-material/Event";
import dayjs from "dayjs";
import { Tooltip, Typography } from "@mui/material";

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [view, setView] = useState("month"); // month 또는 year로 상태 설정
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const PopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dateClearClick = () => {
    setSelectedDate(undefined);
  };

  const getCurrentDateClick = () => {
    setSelectedDate(dayjs());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewChange = (view) => {
    setView(view);
  };

  const handleYearChange = (year) => {
    setSelectedDate(selectedDate.year(year));
  };

  const handleMonthChange = (month) => {
    setSelectedDate(selectedDate.month(month));
  };

  const handleSelect = () => {
    console.log("선택된 년도:", selectedDate.year());
    console.log("선택된 월:", selectedDate.month() + 1); // month() 함수는 0부터 시작하므로 1을 더함.
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography>
        {selectedDate
          ? `${selectedDate.year()}년 ${selectedDate.month() + 1}월`
          : "전체 검색"}
      </Typography>
      <Tooltip title="년, 월 선택">
        <EventAvailableIcon onClick={PopoverClick} />
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button onClick={() => handleViewChange("year")}>년</Button>
          <Button onClick={() => handleViewChange("month")}>월</Button>
          <div style={{ flex: 1 }}></div>
          <Button onClick={handleSelect}>선택</Button>{" "}
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          {view === "month" && (
            <MonthCalendar
              value={selectedDate ? selectedDate : null}
              onChange={(newDate) => handleMonthChange(newDate.month())}
            />
          )}
          {view === "year" && (
            <YearCalendar
              value={selectedDate ? selectedDate : null}
              onChange={(newDate) => handleYearChange(newDate.year())}
            />
          )}
        </LocalizationProvider>
      </Popover>
      <Tooltip title="날짜 전체 검색">
        <EventBusyIcon fontSize="medium" onClick={dateClearClick} />
      </Tooltip>
      <Tooltip title="현재 년, 월 선택">
        <EventIcon onClick={getCurrentDateClick} />
      </Tooltip>
    </div>
  );
}

export default App;

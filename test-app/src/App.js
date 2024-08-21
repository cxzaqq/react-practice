import { useRef, useState, useEffect } from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Box, Typography, List, ListItem } from "@mui/material";
import "dayjs/locale/ko";

dayjs.locale("ko");

export default function DateCalendarServerRequest() {
  const requestAbortController = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [currentMonth, setCurrentMonth] = useState(dayjs().month() + 1); // month is 0-indexed

  useEffect(() => {
    fakeFetch(setIsLoading); // 페이지 처음 접속 시에도 fakeFetch 실행
  }, []);

  useEffect(() => {
    // selectedDate가 바뀌면 currentYear와 currentMonth 업데이트
    setCurrentYear(selectedDate.year());
    setCurrentMonth(selectedDate.month() + 1);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const fakeFetch = (setIsLoading) => {
    setIsLoading(true); // 로딩 상태 시작
    setTimeout(() => {
      setIsLoading(false); // 0.3초 후 로딩 상태 종료
    }, 300);
  };

  const handleMonthChange = async (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    fakeFetch(setIsLoading); // 월이 변경될 때 fakeFetch 실행
    setCurrentYear(date.year());
    setCurrentMonth(date.month() + 1); // month is 0-indexed
    setSelectedDate(date.startOf("month")); // 월이 변경되면 해당 월의 첫 번째 날짜를 선택하도록 설정

    // 월이 변경될 때 선택된 날짜를 모두 지웁니다.
    setHighlightedDays([]);
  };

  const toggleHighlightDay = (day) => {
    const date = day.date();
    setHighlightedDays((prev) => {
      if (prev.includes(date)) {
        return prev.filter((d) => d !== date);
      } else {
        return [...prev, date];
      }
    });
  };

  // highlightedDays를 오름차순으로 정렬
  const sortedHighlightedDays = [...highlightedDays].sort((a, b) => a - b);

  const highlightedDayList = sortedHighlightedDays.map((day) => (
    <ListItem
      key={day}
      button
      onClick={() => toggleHighlightDay(dayjs().date(day))}
    >
      <Typography>
        {highlightedDays.includes(day) ? "✅" : "V"} {day}일
      </Typography>
    </ListItem>
  ));

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flex: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate} // Controlled value
            loading={isLoading}
            onChange={handleDateChange} // 날짜 변경 핸들러
            onMonthChange={handleMonthChange} // 월 변경 핸들러
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: (props) => (
                <ServerDay
                  {...props}
                  onDayClick={() => toggleHighlightDay(props.day)}
                />
              ),
            }}
            slotProps={{
              day: {
                highlightedDays: sortedHighlightedDays,
              },
            }}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ flex: 1, mt: 2, ml: -50 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            minWidth: 240,
          }}
        >
          <Typography variant="body1">
            {currentYear}년 {currentMonth}월 선택된 날짜
          </Typography>
        </Box>
        <List>{highlightedDayList}</List>
      </Box>
    </Box>
  );
}

function ServerDay(props) {
  const {
    highlightedDays = [],
    day,
    outsideCurrentMonth,
    onDayClick,
    ...other
  } = props;

  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  const isToday = day.isSame(dayjs(), "day");

  return (
    <Badge
      overlap="circular"
      badgeContent={isSelected ? "✅" : undefined}
      sx={{
        "& .MuiBadge-dot": {
          backgroundColor: "transparent", // Badge dot 색상 조정
        },
        "& .MuiBadge-badge": {
          // Badge 배경 스타일 조정
          backgroundColor: "transparent",
          color: isSelected ? "green" : "transparent",
        },
      }}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        onClick={() => onDayClick && onDayClick(day)} // 클릭 시 highlight 토글
        sx={{
          backgroundColor: "transparent !important", // 선택된 날짜의 파란 배경 제거
          color: isSelected ? "green" : "black", // 선택된 날짜의 색상을 초록색으로 설정
          border: isToday ? "1px solid gray" : "none", // 오늘 날짜에 기본 테두리 적용
          borderRadius: "50%", // 원형 테두리
          "&.Mui-selected": {
            backgroundColor: "transparent", // 선택된 상태일 때 배경색 제거
            color: isSelected ? "green" : "black",
            border: isToday ? "1px solid gray" : "none",
          },
        }}
      />
    </Badge>
  );
}

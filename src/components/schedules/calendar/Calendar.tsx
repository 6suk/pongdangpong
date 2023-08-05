import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

import { useEventCount } from '@hooks/utils/useEventCount';
import { setLastNextDates, setSelectedDate } from '@stores/selectedDateSlice';
import { AppDispatch, RootState } from '@stores/store';
import { StyleDayEvent, StyleDayNumber, StyledCalendar, StyledDay, StyledDayName } from '@styles/SchedulesStyle';

import { formatDateString } from '@utils/schedules/formatTimestamp';
import { DayType, generateCalendar } from '@utils/schedules/generateCalendar';

interface DayComponentProps {
  dayObj: DayType;
  selectedDate: string;
  getEventCount: (day: DayType) => number;
  handleClickDate: (day: DayType) => void;
}

export interface CalendarEventType {
  date: number;
  month: number;
  year: number;
  count: number;
}

export const DAYOFWEEK_ENUM = ['일', '월', '화', '수', '목', '금', '토'];

export const Calendar = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const selectedDate = useSelector((state: RootState) => state.calendar.checkDate);
  const pathWithSearch = location.search ? location.pathname + location.search : null;
  const calendar = useMemo(() => generateCalendar(selectedDate), [selectedDate]);
  const { getEventCount } = useEventCount(pathWithSearch);

  /** 선택한 날짜 저장 */
  const handleClickDate = (day: DayType) => {
    const dateStr = formatDateString(day);
    dispatch(setSelectedDate(dateStr));
  };

  /** 날짜 선택에 따라 가져올 데이터의 last, next 날짜 저장 */
  useEffect(() => {
    dispatch(
      setLastNextDates({
        last: formatDateString(calendar[0][0]),
        next: formatDateString(calendar[calendar.length - 1][6]),
      })
    );
  }, [calendar, dispatch]);

  return (
    <StyledCalendar>
      {DAYOFWEEK_ENUM.map(day => (
        <StyledDayName key={day}>{day}</StyledDayName>
      ))}
      {calendar.flatMap((week, i) =>
        week.map((dayObj, j) => (
          <DayComponent
            key={`${i}-${j}`}
            dayObj={dayObj}
            getEventCount={getEventCount}
            handleClickDate={handleClickDate}
            selectedDate={selectedDate}
          />
        ))
      )}
    </StyledCalendar>
  );
};

const DayComponent = ({ dayObj, selectedDate, getEventCount, handleClickDate }: DayComponentProps) => (
  <StyledDay key={dayObj.date} onClick={() => handleClickDate(dayObj)}>
    {dayObj.date !== 0 && (
      <>
        <StyleDayNumber
          className={selectedDate === formatDateString(dayObj) ? 'on' : ''}
          data-current-month={dayObj.currentMonth}
          data-day-of-week={dayObj.dayOfWeek}
        >
          <p>{dayObj.date}</p>
        </StyleDayNumber>
        {getEventCount(dayObj) > 0 ? (
          <StyleDayEvent data-current-month={dayObj.currentMonth}>일정 {getEventCount(dayObj)}건</StyleDayEvent>
        ) : (
          <StyleDayEvent className="none" data-current-month={dayObj.currentMonth} />
        )}
      </>
    )}
  </StyledDay>
);

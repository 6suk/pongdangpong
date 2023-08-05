import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setLastNextDates, setSelectedDate } from '@stores/selectedDateSlice';
import { AppDispatch, RootState } from '@stores/store';
import { StyleDayEvent, StyleDayNumber, StyledCalendar, StyledDay, StyledDayName } from '@styles/SchedulesStyle';

import { DayType, generateCalendar } from '@utils/generateCalendar';
import { formatDateString, getDateDetails } from '@utils/getDate';
import { getEventCountbyDate } from '@utils/getEventCountbyDate';

import { SchedulesPropsType } from './SchedulesHome';

export interface CalendarEventType {
  date: number;
  month: number;
  year: number;
  count: number;
}

interface CalendarProps {
  propsData: SchedulesPropsType;
}

export const DAYOFWEEK_ENUM = ['일', '월', '화', '수', '목', '금', '토'];

export const Calendar = ({ propsData: { counselingSchedules, privateSchedules } }: CalendarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedDate = useSelector((state: RootState) => state.calendar.checkDate);
  const selectedDay = getDateDetails(selectedDate);
  const { year, month } = selectedDay;
  const calendar = useMemo(() => generateCalendar(year, month), [year, month]);
  const eventCountList = useCallback(getEventCountbyDate, [counselingSchedules]);
  const [events, setEvents] = useState<CalendarEventType[]>([]);

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

  /** 일정이 없을 경우 체크 */
  const getEventCount = (day: DayType): number => {
    const event = events.find(event => event.date === day.date && event.month === day.month && event.year === day.year);
    return event ? event.count : 0;
  };

  /** 일정 데이터 */
  useEffect(() => {
    if (counselingSchedules && privateSchedules) {
      const newCounts = eventCountList([...counselingSchedules, ...privateSchedules]);
      setEvents(Object.values(newCounts));
    }
  }, [counselingSchedules, privateSchedules, eventCountList]);

  return (
    <StyledCalendar>
      {DAYOFWEEK_ENUM.map(day => (
        <StyledDayName key={day}>{day}</StyledDayName>
      ))}
      {calendar.flatMap((week, i) =>
        week.map((day, j) => (
          <StyledDay key={`${i}-${j}`} onClick={() => handleClickDate(day)}>
            {day.date !== 0 && (
              <>
                <StyleDayNumber
                  data-current-month={day.currentMonth}
                  data-day-of-week={day.dayOfWeek}
                  className={
                    selectedDay?.date === day.date && selectedDay.month === day.month && selectedDay.year === day.year
                      ? 'on'
                      : ''
                  }
                >
                  <p>{day.date}</p>
                </StyleDayNumber>
                {getEventCount(day) > 0 ? (
                  <StyleDayEvent data-current-month={day.currentMonth}>일정 {getEventCount(day)}건</StyleDayEvent>
                ) : (
                  <StyleDayEvent className="none" data-current-month={day.currentMonth} />
                )}
              </>
            )}
          </StyledDay>
        ))
      )}
    </StyledCalendar>
  );
};

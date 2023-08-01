import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { getCurrentDate } from '@components/schedules/utils/getDate';
import { setLastNextDates, setSelectedDate } from '@stores/selectedDateSlice';
import { AppDispatch, RootState } from '@stores/store';
import theme from '@styles/theme';

import { Dashboard } from './Dashboard';
import { DayType, generateCalendar } from './utils/generateCalendar';

export interface CalendarEventType {
  date: number;
  month: number;
  year: number;
  count: number;
}

export const DAYOFWEEK_ENUM = ['일', '월', '화', '수', '목', '금', '토'];

export const Calendar = () => {
  const {
    checkDate: selectedDate,
    eventCount: events,
    sortSchedules,
  } = useSelector((state: RootState) => state.calendar);
  const { month: curMonth } = getCurrentDate();
  const dispatch = useDispatch<AppDispatch>();
  const selected = new Date(selectedDate);
  const selectedDay = {
    date: selected.getDate(),
    month: selected.getMonth() + 1,
    year: selected.getFullYear(),
    currentMonth: selected.getMonth() + 1 === curMonth,
    dayOfWeek: selected.getDay(),
  };
  const { year, month } = selectedDay;
  const calendar = useMemo(() => generateCalendar(year, month), [year, month]);

  const getEventCount = (day: DayType): number => {
    const event = events.find(event => event.date === day.date && event.month === day.month && event.year === day.year);
    return event ? event.count : 0;
  };

  const handleClickDate = (day: DayType) => {
    const dateStr = `${day.year}-${day.month < 10 ? '0' + day.month : day.month}-${
      day.date < 10 ? '0' + day.date : day.date
    }`;
    dispatch(setSelectedDate(dateStr));
  };

  const formatDate = (data: DayType) => {
    const { date, month, year } = data;
    const formattedDate = `${year}-${(month < 10 ? '0' : '') + month}-${(date < 10 ? '0' : '') + date}`;
    return formattedDate;
  };

  useEffect(() => {
    dispatch(
      setLastNextDates({
        last: formatDate(calendar[0][0]),
        next: formatDate(calendar[calendar.length - 1][6]),
      })
    );
  }, [calendar]);

  return (
    <CalendarContainer>
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
                    <StyleDayEvent className="none" />
                  )}
                </>
              )}
            </StyledDay>
          ))
        )}
      </StyledCalendar>
      <Dashboard selectedDay={selectedDay} sortSchedules={sortSchedules} />
    </CalendarContainer>
  );
};

const StyledCalendar = styled.div`
  font-size: ${theme.font.sub};
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  height: 100%;
  grid-gap: 1px;
  background-color: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[800]};
  border-radius: 6px;
  user-select: none;
`;

const StyledDay = styled.div`
  background-color: white;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  align-items: flex-start;
  padding: 6px;
  position: relative;
  aspect-ratio: 6 / 5;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    background-color: ${theme.colors.gray[900]};
  }
`;

const StyleDayNumber = styled.div<{ 'data-current-month': boolean; 'data-day-of-week': number }>`
  width: 25px;
  height: 25px;
  background-color: transparent;
  color: white;
  border-radius: 6px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  color: ${props =>
    props['data-current-month']
      ? props['data-day-of-week'] === 0
        ? props.theme.colors.Error
        : props['data-day-of-week'] === 6
        ? props.theme.colors.pri[500]
        : props.theme.colors.gray[100]
      : props.theme.colors.gray[500]};

  &.on {
    background-color: ${theme.colors.pri[600]};
    color: white;
  }
`;

const StyleDayEvent = styled.p<{ 'data-current-month': boolean }>`
  width: 100%;
  text-align: left;
  padding-left: 0.5rem;
  color: ${theme.colors.pri[600]};
  padding-block: 0.2rem;
  border-radius: 6px;
  border: 1px solid;

  background-color: ${props =>
    props['data-current-month'] ? props.theme.colors.pri[900] : props.theme.colors.gray[800]};
  color: ${props => (props['data-current-month'] ? props.theme.colors.pri[600] : props.theme.colors.gray[500])};
  border-color: ${props => (props['data-current-month'] ? props.theme.colors.pri[800] : props.theme.colors.gray[700])};

  &.none {
    content: '';
    background-color: transparent;
    border: none;
  }
`;

const StyledDayName = styled(StyledDay)`
  width: 100%;
  align-items: center; // Center vertically
  justify-content: center; // Center horizontally
  height: 40px;
  color: ${theme.colors.gray[500]};
  background-color: ${theme.colors.gray[900]};
`;

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: 7fr 3fr;
  width: 100%;
`;

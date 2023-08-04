import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Schedules_list_counseling, Schedules_list_private } from '@apis/schedulesAPIs';
import { CalendarEventType } from '@components/schedules/calendar/Calendar';
import { getCurrentDate } from '@utils/getDate';

const { month: curMonth, year: curYear, date: curDate } = getCurrentDate();

export interface CalendarState {
  checkDate: string;
  eventCount: CalendarEventType[];
  lastNextDates: lastNextDatesState;
  sortSchedules: ScheduleType[];
}

interface lastNextDatesState {
  last: string;
  next: string;
}

export type ScheduleType =
  | { type: string; schedule: Schedules_list_counseling }
  | { type: string; schedule: Schedules_list_private };

const initialState: CalendarState = {
  checkDate: `${curYear}-${curMonth < 10 ? '0' + curMonth : curMonth}-${curDate < 10 ? '0' + curDate : curDate}`,
  eventCount: [{ date: 0, count: 0, month: 0, year: 0 }],
  lastNextDates: {
    last: '',
    next: '',
  },
  sortSchedules: [],
};

export const calendarSlice = createSlice({
  name: 'selectedDate',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.checkDate = action.payload;
    },
    setEventCount: (state, action: PayloadAction<CalendarEventType[]>) => {
      state.eventCount = action.payload;
    },
    setLastNextDates: (state, action: PayloadAction<lastNextDatesState>) => {
      state.lastNextDates = action.payload;
    },
    setSortSchedules: (state, action: PayloadAction<ScheduleType[]>) => {
      state.sortSchedules = action.payload;
    },
    clearSelectedDate: () => initialState,
  },
});

export const { setSelectedDate, clearSelectedDate, setEventCount, setLastNextDates, setSortSchedules } =
  calendarSlice.actions;
export const calendarReducer = calendarSlice.reducer;

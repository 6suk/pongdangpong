import { Schedules_list_counseling } from '@apis/schedulesAPIs';

import { CalendarEventType } from '../Calendar';

/** 일정 카운트 */
export const getEventCountbyDate = (schedules: Schedules_list_counseling[]): { [key: string]: CalendarEventType } => {
  return schedules.reduce(
    (acc: { [key: string]: CalendarEventType }, schedule: Schedules_list_counseling) => {
      const date = new Date(schedule.startAt);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

      if (!acc[key]) {
        acc[key] = { year: date.getFullYear(), month: date.getMonth() + 1, date: date.getDate(), count: 0 };
      }

      acc[key].count++;
      return acc;
    },
    {} as { [key: string]: CalendarEventType }
  );
};

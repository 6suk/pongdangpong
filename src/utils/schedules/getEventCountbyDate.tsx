import { Schedules_list_counseling, Schedules_list_private } from '@apis/schedulesAPIs';
import { CalendarEventType } from '@components/schedules/calendar/Calendar';

import { extractDate, getDateDetails } from './formatTimestamp';

interface Schedule {
  startAt: string;
  isCanceled: boolean;
}

/** 일정 카운트 */
const getEventCountbyDateUtil = (schedules: Schedule[]): { [key: string]: CalendarEventType } => {
  return schedules.reduce(
    (acc: { [key: string]: CalendarEventType }, schedule: Schedule) => {
      // 취소된 일정은 스킵
      if (schedule.isCanceled) {
        return acc;
      }

      const key = extractDate(schedule.startAt);

      if (!acc[key]) {
        acc[key] = { ...getDateDetails(schedule.startAt), count: 0 };
      }

      acc[key].count++;
      return acc;
    },
    {} as { [key: string]: CalendarEventType }
  );
};

/** 오버로딩 */
export function getEventCountbyDate(schedules: Schedules_list_counseling[]): { [key: string]: CalendarEventType };
export function getEventCountbyDate(schedules: Schedules_list_private[]): { [key: string]: CalendarEventType };
export function getEventCountbyDate(schedules: Schedule[]): { [key: string]: CalendarEventType };
export function getEventCountbyDate(schedules: Schedule[]): { [key: string]: CalendarEventType } {
  return getEventCountbyDateUtil(schedules);
}

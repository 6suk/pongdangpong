import { useCallback, useEffect, useState, useMemo } from 'react';

import { SchedulesListResponse } from '@apis/types/schedulesTypes';

import { CalendarEventType } from '@components/schedules/calendar/Calendar';
import { useSwrData } from '@hooks/apis/useSwrData';
import { formatDateString } from '@utils/schedules/formatTimestamp';
import { DayType } from '@utils/schedules/generateCalendar';
import { getEventCountbyDate } from '@utils/schedules/getEventCountbyDate';

/**
 * 일정관리 - 일정 카운트 데이터
 * @param pathWithSearch
 * @returns
 */
export const useEventCount = (pathWithSearch: string | null, tutorId: number = 0) => {
  const { data } = useSwrData<SchedulesListResponse>(pathWithSearch);
  const [events, setEvents] = useState<{ [key: string]: CalendarEventType }>({});

  const allSchedules = useMemo(() => {
    if (!data) return [];

    const counselingSchedules = tutorId
      ? data.counselingSchedules.filter(schedule => schedule.counselor.id === tutorId)
      : data.counselingSchedules;

    const privateSchedules = tutorId
      ? data.privateSchedules.filter(schedule => schedule.tutor.id === tutorId)
      : data.privateSchedules;

    return [...counselingSchedules, ...privateSchedules];
  }, [data, tutorId]);

  const getEventCount = useCallback(
    (dayObj: DayType): number => {
      const event = events[formatDateString(dayObj)];
      return event ? event.count : 0;
    },
    [events]
  );

  useEffect(() => {
    if (allSchedules.length === 0) {
      setEvents({});
      return;
    }

    const newCounts = getEventCountbyDate(allSchedules);
    setEvents(newCounts);
  }, [allSchedules]);

  return { getEventCount };
};

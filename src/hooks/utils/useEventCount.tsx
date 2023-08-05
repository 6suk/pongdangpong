import { useCallback, useEffect, useState, useMemo } from 'react';

import { Schedules_list } from '@apis/schedulesAPIs';
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
export const useEventCount = (pathWithSearch: string | null) => {
  const { data } = useSwrData<Schedules_list>(pathWithSearch);
  const [events, setEvents] = useState<{ [key: string]: CalendarEventType }>({});

  const allSchedules = useMemo(() => {
    if (!data) return [];
    return [...data.counselingSchedules, ...data.privateSchedules];
  }, [data]);

  const getEventCount = useCallback(
    (dayObj: DayType): number => {
      const event = events[formatDateString(dayObj)];
      return event ? event.count : 0;
    },
    [events]
  );

  useEffect(() => {
    if (allSchedules.length === 0) return;

    const newCounts = getEventCountbyDate(allSchedules);
    setEvents(newCounts);
  }, [allSchedules]);

  return { getEventCount };
};

import { useMemo } from 'react';

import { Schedules_list, Schedules_list_counseling, Schedules_list_private } from '@apis/schedulesAPIs';
import { useSwrData } from '@hooks/apis/useSwrData';

export interface FilterAndSortSchedulesReturnType {
  sortedSchedules: (
    | { type: string; schedule: Schedules_list_counseling }
    | { type: string; schedule: Schedules_list_private }
  )[];
  canceledCount: number;
  totalSchedules: number;
  cancellationRate: number;
}

/**
 * 일정관리 - 대시보드 데이터
 * @param selectedDate
 * @returns
 */
export const useFilterAndSortSchedules = (
  selectedDate: string,
  filterId: number = 0
): FilterAndSortSchedulesReturnType => {
  const { data } = useSwrData<Schedules_list>(`schedules?from=${selectedDate}&to=${selectedDate}`);

  const result = useMemo(() => {
    if (!data)
      return {
        sortedSchedules: [],
        canceledCount: 0,
        totalSchedules: 0,
        cancellationRate: 0,
      };

    const counselingSchedules = filterId
      ? data.counselingSchedules.filter(schedule => schedule.counselor.id === filterId)
      : data.counselingSchedules;

    const privateSchedules = filterId
      ? data.privateSchedules.filter(schedule => schedule.tutor.id === filterId)
      : data.privateSchedules;

    const allSchedules = [
      ...counselingSchedules.map(schedule => ({ type: 'counseling', schedule })),
      ...privateSchedules.map(schedule => ({ type: 'private-lesson', schedule })),
    ];

    const sortedSchedules = allSchedules
      .filter(({ schedule }) => !schedule.isCanceled)
      .sort((a, b) => new Date(a.schedule.startAt).getTime() - new Date(b.schedule.startAt).getTime());

    const canceledCount = allSchedules.filter(({ schedule }) => schedule.isCanceled).length;
    const totalSchedules = sortedSchedules.length + canceledCount;
    const cancellationRate = totalSchedules > 0 ? Math.floor((canceledCount / totalSchedules) * 100) : 0;

    return { sortedSchedules, canceledCount, totalSchedules, cancellationRate };
  }, [data, filterId]);

  return result;
};

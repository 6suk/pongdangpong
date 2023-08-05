import { Schedules_list_counseling, Schedules_list_private } from '@apis/schedulesAPIs';

export interface filterAndSortSchedulesByDateType {
  sortedSchedules: (
    | { type: string; schedule: Schedules_list_counseling }
    | { type: string; schedule: Schedules_list_private }
  )[];
  canceledCount: number;
}

/** 데이터 날짜순 정렬 및, isActive 필터, isActicv 갯수 반환 */
export const filterAndSortSchedulesByDate = (
  selectedDate: string,
  propsData: {
    counselingSchedules?: Array<Schedules_list_counseling>;
    privateSchedules?: Array<Schedules_list_private>;
  }
): filterAndSortSchedulesByDateType => {
  const { counselingSchedules, privateSchedules } = propsData;
  const allSchedules = [
    ...(counselingSchedules || []).map(schedule => ({ type: 'counseling', schedule })),
    ...(privateSchedules || []).map(schedule => ({ type: 'private-lesson', schedule })),
  ];

  const allSchedulesFiltered = allSchedules.filter(({ schedule }) => {
    const scheduleDate = new Date(schedule.startAt);
    const selectedDateforDate = new Date(selectedDate);
    return (
      scheduleDate.getFullYear() === selectedDateforDate.getFullYear() &&
      scheduleDate.getMonth() === selectedDateforDate.getMonth() &&
      scheduleDate.getDate() === selectedDateforDate.getDate()
    );
  });

  const sortedSchedules = allSchedulesFiltered
    .filter(({ schedule }) => !schedule.isCanceled)
    .sort((a, b) => {
      const dateA = new Date(a.schedule.startAt);
      const dateB = new Date(b.schedule.startAt);
      return dateA.getTime() - dateB.getTime();
    });

  /** 취소된 일정 카운트 */
  const canceledCount = allSchedulesFiltered.filter(({ schedule }) => schedule.isCanceled).length;

  return {
    sortedSchedules,
    canceledCount,
  };
};

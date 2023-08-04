import { Schedules_list_counseling, Schedules_list_private } from '@apis/schedulesAPIs';

export const filterAndSortSchedulesByDate = (
  counselingSchedules: Array<Schedules_list_counseling>,
  privateSchedules: Array<Schedules_list_private>,
  selectedDate: string
) => {
  const allSchedules = [
    ...counselingSchedules.map(schedule => ({ type: 'counseling', schedule })),
    ...privateSchedules.map(schedule => ({ type: 'private-lesson', schedule })),
  ];

  return allSchedules
    .filter(({ schedule }) => {
      const scheduleDate = new Date(schedule.startAt);
      const selectedDateforDate = new Date(selectedDate);
      return (
        scheduleDate.getFullYear() === selectedDateforDate.getFullYear() &&
        scheduleDate.getMonth() === selectedDateforDate.getMonth() &&
        scheduleDate.getDate() === selectedDateforDate.getDate()
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.schedule.startAt);
      const dateB = new Date(b.schedule.startAt);
      return dateA.getTime() - dateB.getTime();
    });
};

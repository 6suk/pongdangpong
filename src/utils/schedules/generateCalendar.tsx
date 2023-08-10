export interface DayType {
  date: number;
  month: number;
  year: number;
  currentMonth: boolean;
  dayOfWeek: number;
}

export const generateCalendar = (dateString: string) => {
  const [year, month] = dateString.split('-').map(Number);
  const startDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = 32 - new Date(year, month - 1, 32).getDate();
  const weeksInMonth = Math.ceil((startDay + daysInMonth) / 7);

  const calendar: DayType[][] = [];

  const lastMonth = month - 1 < 0 ? 11 : month - 1;
  const nextMonth = month + 1 > 11 ? 0 : month + 1;
  const lastMonthYear = lastMonth === 11 ? year - 1 : year;
  const nextMonthYear = nextMonth === 0 ? year + 1 : year;
  const lastMonthDaysInMonth = 32 - new Date(lastMonthYear, lastMonth, 32).getDate();

  for (let i = 0; i < weeksInMonth; i++) {
    const week: DayType[] = [];

    for (let j = 0; j < 7; j++) {
      const dayOfWeek = (i * 7 + j) % 7; // Changed here
      const dayIndex = i * 7 + j - startDay + 1;
      if (dayIndex > 0 && dayIndex <= daysInMonth) {
        week.push({ date: dayIndex, month, year, currentMonth: true, dayOfWeek });
      } else if (dayIndex <= 0) {
        // Last month's dates
        week.push({
          date: lastMonthDaysInMonth + dayIndex,
          month: lastMonth,
          year: lastMonthYear,
          currentMonth: false,
          dayOfWeek,
        });
      } else {
        // Next month's dates
        week.push({
          date: dayIndex - daysInMonth,
          month: nextMonth,
          year: nextMonthYear,
          currentMonth: false,
          dayOfWeek,
        });
      }
    }

    calendar.push(week);
  }

  return calendar;
};

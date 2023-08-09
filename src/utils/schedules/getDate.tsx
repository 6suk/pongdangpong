import { extractDate, formatDateString } from './formatTimestamp';

/** 현재 날짜 반환 */
export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();
  const dayOfWeek = currentDate.getDay();
  return { year, month, date, dayOfWeek };
};

/* 현재 날짜의 첫날, 마지막날 반환 */
export const getLastDateOfMonth = (selectedDate: string): { formattedFirstDate: string; formattedLastDate: string } => {
  const selected = new Date(selectedDate);
  const year = selected.getFullYear();
  const month = selected.getMonth() + 1;

  const lastDay = new Date(year, month, 0).getDate();
  const formattedFirstDate = `${year}-${month < 10 ? '0' + month : month}-01`;
  const formattedLastDate = `${year}-${month < 10 ? '0' + month : month}-${lastDay < 10 ? '0' + lastDay : lastDay}`;

  return { formattedFirstDate, formattedLastDate };
};

export const getTodayCalendarRangePath = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  const startDayOfWeek = firstDayOfMonth.getDay();
  const endDayOfWeek = lastDayOfMonth.getDay();

  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - startDayOfWeek);

  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endDayOfWeek));

  return `?from=${extractDate(startDate.toString())}&to=${extractDate(endDate.toString())}`;
};

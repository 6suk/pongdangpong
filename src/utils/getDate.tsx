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

interface DateDetails {
  date: number;
  month: number;
  year: number;
  currentMonth: boolean;
  dayOfWeek: number;
}

/**
 * 2023-00-00 > object 반환
 * @param selectedDate
 * @returns
 */
export const getDateDetails = (selectedDate: string): DateDetails => {
  const selected = new Date(selectedDate);
  const curMonth = new Date().getMonth() + 1;

  return {
    date: selected.getDate(),
    month: selected.getMonth() + 1,
    year: selected.getFullYear(),
    currentMonth: selected.getMonth() + 1 === curMonth,
    dayOfWeek: selected.getDay(),
  };
};

/**
 * object > 2023-00-00 반환
 * @param dateDetails
 * @returns
 */
export const formatDateString = (dateDetails: DateDetails) => {
  const date = dateDetails.date;
  const month = dateDetails.month;
  const year = dateDetails.year;

  return `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
};

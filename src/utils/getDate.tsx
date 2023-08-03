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

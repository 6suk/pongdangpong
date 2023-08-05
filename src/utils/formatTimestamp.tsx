const parseDate = (timestamp: string) => {
  const dt = new Date(timestamp);
  const year = dt.getFullYear();
  const month = String(dt.getMonth() + 1).padStart(2, '0');
  const day = String(dt.getDate()).padStart(2, '0');
  const hour = String(dt.getHours()).padStart(2, '0');
  const minute = String(dt.getMinutes()).padStart(2, '0');
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[dt.getDay()];
  return { year, month, day, hour, minute, weekday };
};

/**
 * 2023-08-03T23:03:05 > 2023년 08월 03일 (목) 23시 03분
 * @param timestamp
 */
export const formatTimestamp = (timestamp: string): string => {
  const { year, month, day, hour, minute, weekday } = parseDate(timestamp);
  return `${year}년 ${month}월 ${day}일 (${weekday}) ${hour}시 ${minute}분`;
};

/**
 * 2023-08-03T23:03:05 > 2023년 08월 03일 (목)
 * @param timestamp
 */
export const formatDate = (timestamp: string): string => {
  const { year, month, day, weekday } = parseDate(timestamp);
  return `${year}.${month}.${day} (${weekday})`;
};

/**
 *"2023-08-04T10:00:00",  "2023-08-04T12:00:00"  > 10:00 ~ 12:00
 * @param startAt
 * @param endAt
 */
export const formatTimeRange = (startAt: string, endAt: string): string => {
  const { hour: startHour, minute: startMinute } = parseDate(startAt);
  const { hour: endHour, minute: endMinute } = parseDate(endAt);
  return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
};

/**
 * 2023-08-03T23:03:05 > 2023-08-03
 * @param timestamp
 */
export const extractDate = (timestamp: string): string => {
  const { year, month, day } = parseDate(timestamp);
  return `${year}-${month}-${day}`;
};

/**
 * 2023-08-03T23:03:05 > 23:03
 * @param timestamp
 */
export const extractTime = (timestamp: string): string => {
  const { hour, minute } = parseDate(timestamp);
  return `${hour}:${minute}`;
};

/**
 * "2023-08-01" "12:00" > "2023-08-01T12:00:00.000Z"
 * @param date
 * @param time
 */
export const combineDateTimeToISO = (date: string, time: string): string => {
  return new Date(`${date}T${time}:00.000Z`).toISOString();
};

/**
 * "2023-08-01" "12:00" > "2023-08-01T12:00:00"
 * @param date
 * @param time
 */
export const combineDateTime = (date: string, time: string): string => {
  return `${date}T${time}:00`;
};

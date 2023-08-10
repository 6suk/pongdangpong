import { TicketDefaultTermUnitType, TicketLessonTypeType } from './ticketsTypes';
/** Schedule : 스케쥴 관리 (개인수업/상담) */

/**
 * - [get] 일정조회
 * - /api/v1/schedules
 * - [query] from, to
 */
export interface SchedulesListResponse {
  users: SchedulesListUsersType[];
  counselingSchedules: SchedulesListCounselingsType[];
  privateSchedules: SchedulesListPrivateLessonsType[];
}

export interface SchedulesListUsersType {
  id: number;
  name: string;
}

export interface SchedulesListCounselingsType {
  id: number;
  startAt: string; // $date-time;
  endAt: string; // $date-time;
  memo: string;
  isCanceled: boolean;
  canceledAt?: string; // $date-time;
  counselor: {
    id: number;
    name: string;
  };
  client: {
    memberId: number;
    name: string;
    phone: string;
  };
  createdAt: string; // $date-time;
  updatedAt: string; // $date-time;
}

export interface SchedulesListPrivateLessonsType {
  id: number;
  tutor: {
    id: number;
    name: string;
  };
  startAt: string; // $date-time;
  endAt: string; // $date-time;
  memo: string;
  isCanceled: boolean;
  canceledAt?: string; // $date-time;
  issuedTicket: PrivateLessonIssuedTicketType;
  attendanceHistories: AttendanceHistoriesType[];
  createdAt: string; // $date-time;
  updatedAt: string; // $date-time;
}

export interface AttendanceHistoriesType {
  id: number;
  member: {
    id: number;
    name: string;
    phone: string;
  };
  status: StatusType;
}
export type StatusType = 'WAIT' | 'PRESENT' | 'ABSENT';
export const StatusEnum = {
  WAIT: '예약',
  PRESENT: '출석',
  ABSENT: '결석',
};

export interface PrivateLessonIssuedTicketType {
  id: number;
  lessonType: TicketLessonTypeType;
  title: string;
  startAt: string; // $date;
  endAt?: string; // $date;
  remainingCount?: number;
  defaultCount?: number;
  serviceCount?: number;
  availableReservationCount?: number;
  defaultTerm?: number;
  defaultTermUnit?: TicketDefaultTermUnitType;
  isSuspended: boolean;
  suspendedAt?: string; // $date-time;
  isCanceled: boolean;
  canceledAt?: string; // $date-time;
  createdAt: string; // $date-time;
  updatedAt: string; // $date-time;
}

/**
 * - [get] 상담 - 일정 상세조회
 * - /api/v1/schedules/counseling/{scheduleId}
 */
export interface CounselingResponse extends SchedulesListCounselingsType {
  counselingRecord: {
    id: number;
    content: string;
    createdBy: {
      id: number;
      name: string;
    };
    updatedBy: {
      id: number;
      name: string;
    };
    createdAt: string; // date-time;
    updatedAt: string; // date-time;
  };
  createdBy: {
    id: number;
    name: string;
  };
  updatedBy: {
    id: number;
    name: string;
  };
}

/**
 * - [get] 개인수업 - 일정 상세조회
 * - /api/v1/schedules/private-lesson/{scheduleId}
 */
export interface PrivateLessonResponse extends SchedulesListPrivateLessonsType {
  createdBy: {
    id: number;
    name: string;
  };
  updatedBy: {
    id: number;
    name: string;
  };
}

/**
 * - [post] 개인수업 - 일정 생성
 * - /api/v1/schedules/private-lesson
 */
export interface PrivateLessonRequestBody {
  userId: number;
  issuedTicketId: number;
  startAt: string; // date-time;
  endAt: string; // date-time;
}

/**
 * - [put] 개인수업 - 일정 정보 변경
 * - /api/v1/schedules/private-lesson/{scheduleId}
 */
export interface PrivateLessonEditRequestBody {
  memo: string;
  startAt: string; // date-time;
  endAt: string; // date-time;
}

export type PrivateLessonFormInputsType = {
  issuedTicketId: number;
  memo: string;
  date: string;
  startTime: string;
  endTime: string;
};

export const PrivateLessonFormInit: PrivateLessonFormInputsType = {
  issuedTicketId: 0,
  memo: '',
  date: '',
  startTime: '',
  endTime: '',
};

/**
 * - [post] 상담 - 일정 생성
 * - /api/v1/schedules/counseling
 */
export interface CounselingRequestBody {
  userId: number;
  memberId?: number;
  clientName: string;
  clientPhone: string;
  memo: string;
  startAt: string; // date-time;
  endAt: string; // date-time;
  counselingRecordContent?: string;
}

export type CounselingFormInputsType = {
  clientName: string;
  clientPhone: string;
  memo: string;
  date: string;
  startTime: string;
  endTime: string;
};

export const CounselingInitInput: CounselingFormInputsType = {
  clientName: '',
  clientPhone: '',
  memo: '',
  date: '',
  startTime: '',
  endTime: '',
};

/**
 * - [get] 예약 가능 발급 수강권 조회
 * - [query] lessonTypeGroup, tutorId
 * - /api/v1/members/{memberId}/bookable-tickets
 */
export interface BookableTicketsResponse {
  availableTickets: AvailableTicketsType[];
}

export interface AvailableTicketsType {
  id: number;
  title: string;
  lessonType: TicketLessonTypeType;
  privateTutorId: number;
  remainingCount: number;
  availableReservationCount: number;
  lessonDuration: number;
  owners: AvailableTicketsOwnerType[];
}

export interface AvailableTicketsOwnerType {
  id: number;
  name: string;
  phone: string;
}

import { ticket_defaultTermUnit, ticket_lessonType } from './ticketsAPIs';

export interface Schedules_list_user {
  id: number;
  name: string;
}

/**
 * 상담
 */
export interface Schedules_list_counseling {
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

export interface Schedules_detail_counseling extends Schedules_list_counseling {
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
 * 일정
 */
export interface Schedules_list_private {
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
  issuedTicket: SchedulesIssuedTicketType;
  attendanceHistories: AttendanceHistoriesType[];
  createdAt: string; // $date-time;
  updatedAt: string; // $date-time;
}

export interface Schedules_detail_private extends Schedules_list_private {
  createdBy: {
    id: number;
    name: string;
  };
  updatedBy: {
    id: number;
    name: string;
  };
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

export const statusNumberEnum = {
  WAIT: 0,
  PRESENT: 1,
  ABSENT: 2,
};

export interface SchedulesIssuedTicketType {
  id: number;
  lessonType: ticket_lessonType;
  title: string;
  startAt: string; // $date;
  endAt?: string; // $date;
  remainingCount?: number;
  defaultCount?: number;
  serviceCount?: number;
  availableReservationCount?: number;
  defaultTerm?: number;
  defaultTermUnit?: ticket_defaultTermUnit;
  isSuspended: boolean;
  suspendedAt?: string; // $date-time;
  isCanceled: boolean;
  canceledAt?: string; // $date-time;
  createdAt: string; // $date-time;
  updatedAt: string; // $date-time;
}

export interface Schedules_list {
  users: Schedules_list_user[];
  counselingSchedules: Schedules_list_counseling[];
  privateSchedules: Schedules_list_private[];
}

/** 통합 검색 */
export interface SearchResponseType {
  searchParam: {
    query: string;
    resources: ['USER' | 'MEMBER'];
  };
  members: MemberSearchType[];
  users: UsersSearchType[];
  message: string;
}

/** 회원 통합 검색 */
export interface MemberSearchType {
  id: number;
  name: string;
  phone: string;
  sex: 'MALE' | 'FEMALE';
  birthDate: string; // date;
  createdAt: string; // date-time;
  updatedAt: string; // date-time;
  visitedAt: string; // date-time;
}

/** 직원 통합 검색 */
export interface UsersSearchType {
  id: number;
  type: UserType;
  loginId: string;
  name: string;
  phone: string;
  isActive: true;
  createdAt: string; // date-time;
  updatedAt: string; // date-time;
  lastLoginedAt: string; // date-time;
}

export type UserType = 'ADMIN' | 'STAFF';

export interface BookableTicketsRequest {
  availableTickets: AvailableTicketsType[];
}

export interface AvailableTicketsType {
  id: number;
  title: string;
  lessonType: ticket_lessonType;
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

/** 일정 생성 Form */
export interface PrivatelessonRequest {
  userId: number;
  issuedTicketId: number;
  startAt: string; // date-time;
  endAt: string; // date-time;
}
export interface PrivatelessonEditRequest {
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

export const PrivateLessonInitInput: PrivateLessonFormInputsType = {
  issuedTicketId: 0,
  memo: '',
  date: '',
  startTime: '',
  endTime: '',
};

/** 상담 생성 Form */
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

export interface CounselingRequest {
  userId: number;
  memberId?: number;
  clientName: string;
  clientPhone: string;
  memo: string;
  startAt: string; // date-time;
  endAt: string; // date-time;
  counselingRecordContent?: string;
}

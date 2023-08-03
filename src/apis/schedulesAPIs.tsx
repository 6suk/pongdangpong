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
  issuedTicket: {
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
  };
  attendanceHistories: [
    {
      id: number;
      member: {
        id: number;
        name: string;
        phone: string;
      };
      status: 'WAIT' | 'PRESENT' | 'ABSENT';
    },
  ];
  createdAt: string; // $date-time;
  updatedAt: string; // $date-time;
}

export const StatusEnum = {
  WAIT: '예약',
  PRESENT: '출석',
  ABSENT: '결석',
};

export interface Schedules_list {
  users: Schedules_list_user[];
  counselingSchedules: Schedules_list_counseling[];
  privateSchedules: Schedules_list_private[];
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

export type PrivateLessonFormInputsType = {
  userId: number;
  issuedTicketId: number;
  memberId: number;
  memo: string;
  date: string;
  startTime: string;
  endTime: string;
  startAt: string;
  endAt: string;
};

export const PrivateLessonInitInput: PrivateLessonFormInputsType = {
  userId: 0,
  issuedTicketId: 0,
  memberId: 0,
  memo: '',
  date: '',
  startTime: '',
  endTime: '',
  startAt: '',
  endAt: '',
};

export interface PrivatelessonRequest {
  userId: number;
  issuedTicketId: number;
  startAt: string; // date-time;
  endAt: string; // date-time;
}

/** 상담 생성 Form */
export type CounselingFormInputsType = {
  userId: number;
  memberId: number;
  clientName: string;
  clientPhone: string;
  memo: string;
  date: string;
  startTime: string;
  endTime: string;
  startAt: string;
  endAt: string;
};

export const CounselingInitInput: CounselingFormInputsType = {
  userId: 0,
  memberId: 0,
  clientName: '',
  clientPhone: '',
  memo: '',
  date: '',
  startTime: '',
  endTime: '',
  startAt: '',
  endAt: '',
};

export interface CounselingRequest {
  userId: number;
  memberId: number;
  clientName: string;
  clientPhone: string;
  memo: string;
  startAt: string; // date-time;
  endAt: string; // date-time;
}

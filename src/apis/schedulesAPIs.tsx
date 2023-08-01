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

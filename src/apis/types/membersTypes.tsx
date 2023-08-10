/** Member : 회원관리 */

import { TicketDefaultTermUnitType, TicketLessonTypeType } from './ticketsTypes';

export type SexType = 'MALE' | 'FEMALE';
export const sexEnum = {
  MALE: '남',
  FEMALE: '여',
};

/**
 * - [post] 회원 등록
 * - /api/v1/members
 */
export interface MembersRequestBody {
  name: string;
  birthDate: string; // date
  phone: string;
  sex: SexType;
  job: string;
  acqusitionFunnel: string;
  acquisitionFunnel: string;
  toss: [
    {
      id: number;
      agree: boolean;
    },
  ];
}

/**
 * - [get] 회원 전체 조회
 * - [query] page, size, sort
 * - /api/v1/members
 */
export interface MemberListResponse {
  meta: MemberListMetaType;
  datas: MemberListDatasType[];
  message: string;
}

export interface MemberListDatasType {
  id: number;
  name: string;
  phone: string;
  sex: SexType;
  birthDate: string; // date
  createdAt: string; // date-time
  updatedAt: string; // date-time
  visitedAt: string; // date-time
}

export interface MemberListMetaType {
  totalCount: number;
  size: number;
  count: number;
  page: number;
  hasMore: true;
}

/**
 * - [get] 회원 상세 조회
 * - /api/v1/members/{memberId}
 */
export interface MemberDetailResponse {
  id: number;
  name: string;
  phone: string;
  job: string;
  birthDate: string; // date
  sex: SexType;
  acqusitionFunnel: string;
  acquisitionFunnel: string;
  visitedAt: string; // date-time
  createdAt: string; // date-time
  updatedAt: string; // date-time
  message: string;
}

export interface MemberTicketResponse {
  issuedTickets: MemberIssuedTicketType[];
  message: 'string';
}

export interface MemberIssuedTicketType {
  id: number;
  lessonType: TicketLessonTypeType;
  title: string;
  startAt: string; //date
  endAt: string; //date
  remainingCount: number;
  defaultCount: number;
  serviceCount: number;
  availableReservationCount: number;
  defaultTerm: number;
  defaultTermUnit: TicketDefaultTermUnitType;
  isSuspended: boolean;
  suspendedAt: string; //date-time
  isCanceled: boolean;
  canceledAt: string; //date-time
  createdAt: string; //date-time
  updatedAt: string; //date-time
}

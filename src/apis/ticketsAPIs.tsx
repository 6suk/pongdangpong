import { APIState, RequestBody } from './apiInterfaces';

/**
 * [tickets-R] 수강권 리스트
 */
export const tickets_list: APIState = {
  url: 'tickets',
  method: 'get',
};

/**
 * [tickets-C] 수강권 생성
 * @필수 `body` - Tickets_request
 */
export const tickets_create: RequestBody<Tickets_request> = {
  url: `tickets`,
  method: 'post',
  isBody: true,
  body: {
    lessonType: 'SINGLE',
    title: '',
    dailyCountLimit: 0,
    defaultCount: 0,
    defaultTerm: 0,
    defaultTermUnit: 'DAY',
    duration: 0,
    maxServiceCount: 0,
  },
};

/**
 * [tickets-C] 수강권 생성 - `Request Body`
 */
export interface Tickets_request {
  lessonType: 'SINGLE' | 'DUET' | 'TRIPLE' | 'GROUP';
  title: string;
  duration: number;
  defaultCount: number;
  maxServiceCount?: number;
  defaultTerm: number;
  defaultTermUnit: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  dailyCountLimit?: number;
}

export const tickets_title = {
  lessonType: '수업유형',
  title: '수강권명',
  defaultCount: '기본횟수',
  defaultTerm: '수강권 기간',
  duration: '시간',
  maxServiceCount: '서비스 횟수',
};

export const LessonTypeEnum = {
  SINGLE: '1:1 개인수업',
  DUET: '2:1 수업',
  TRIPLE: '3:1 수업',
  GROUP: '그룹수업',
};

export const TermUnitEnum = {
  DAY: '일',
  WEEK: '주',
  MONTH: '개월',
  YEAR: '년',
};

/**
 * [tickets-C] 수강권 생성 - `Response`
 */
export interface Ticket_response extends Tickets_request {
  id: number;
  issuedTicketCount: number;
  isActive: boolean;
  bookableLessons: [
    {
      id: number;
      type: 'SINGLE' | 'DUET' | 'TRIPLE' | 'GROUP';
      title: string;
      duration: number;
      maxGroupMember: number;
    },
  ];
}

/**
 * [tickets-D] 수강권 삭제
 * @필수 `path` - ticketId
 */
export const tickets_delete: APIState = {
  method: 'delete',
  url: 'tickets',
  isPath: true,
};

/**
 * [tickets-U] 수강권 수정
 * @필수 `body` - Ticket_put_body
 */
export const tickets_put: RequestBody<Ticket_put_body> = {
  url: 'tickets',
  method: 'put',
  isBody: true,
  isPath: true,
  body: {
    defaultCount: 0,
    defaultTerm: 0,
    defaultTermUnit: 'DAY',
    maxServiceCount: 0,
  },
};

export type Ticket_put_body = Pick<
  Ticket_response,
  'defaultCount' | 'defaultTerm' | 'defaultTermUnit' | 'maxServiceCount'
>;

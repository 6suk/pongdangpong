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
  maxServiceCount: number;
  defaultTerm: number;
  defaultTermUnit: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  dailyCountLimit: number;
}

/**
 * [tickets-C] 수강권 생성 - `Response`
 */
export interface Ticket_response extends Tickets_request {
  id: number;
  issuedTicketCount: number;
  isActive: boolean;
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

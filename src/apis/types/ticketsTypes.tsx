/** CenterTicket : 센터에서 관리하는 수강권 */

/**
 * - [post] 수강권 생성
 * - /api/v1/tickets
 */
export interface TicketsRequestBody {
  lessonType: TicketLessonTypeType;
  title: string;
  duration: number;
  defaultCount?: number; // null = 무제한
  maxServiceCount?: number;
  defaultTerm?: number; // null = 소진시까지
  defaultTermUnit?: TicketDefaultTermUnitType;
  dailyCountLimit?: number;
}

export type TicketDefaultTermUnitType = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
export const TermUnitEnum = {
  DAY: '일',
  WEEK: '주',
  MONTH: '개월',
  YEAR: '년',
};

export type TicketLessonTypeType = 'SINGLE' | 'DUET' | 'TRIPLE' | 'GROUP';
export const LessonTypeEnum = {
  SINGLE: '1:1 개인수업',
  DUET: '2:1 수업',
  TRIPLE: '3:1 수업',
  GROUP: '그룹수업',
};

export const TicketsFormTitles = {
  lessonType: '수업유형',
  title: '수강권명',
  defaultCount: '기본횟수',
  defaultTerm: '수강권 기간',
  duration: '시간',
  maxServiceCount: '서비스 횟수',
  issuedTicketCount: '부여',
};

export const TicketFormInit = {
  lessonType: 'SINGLE',
  title: '',
  dailyCountLimit: 0,
  defaultCount: 0,
  defaultTerm: 0,
  defaultTermUnit: 'DAY',
  duration: 0,
  maxServiceCount: 0,
};

/**
 * - [get] 수강권 리스트
 * - /api/v1/tickets
 */
export interface TicketListResponse extends TicketsRequestBody {
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
 * - [put] 수강권 수정
 * - /api/v1/tickets
 */
export type TicketPutRequestBody = Pick<
  TicketListResponse,
  'defaultCount' | 'defaultTerm' | 'defaultTermUnit' | 'maxServiceCount'
>;

/**
 * - [get] 수강권 부여내역 (페이지네이션)
 * - [query] page, size, sort
 * - /api/v1/tickets/{ticketId}/issued-tickets
 */
export interface IssuedTicketListReponse {
  meta: {
    totalCount: number;
    size: number;
    count: number;
    page: number;
    hasMore: boolean;
  };
  datas: [IssuedTicketListDatasType];
  message: string;
}

export interface IssuedTicketListDatasType {
  id: number;
  owners: [
    {
      id: number;
      name: string;
      phone: string;
    },
  ];
  privateTutor: {
    id: number;
    name: string;
  };
  remainingTimes: number;
  startAt: string; // 0000-00-00
  endAt: string; // 0000-00-00
}

/** IssuedTicket : CenterTicket이 Member에게 부여된 개별 Ticket */

/**
 * - [get] 회원 수강권 상세
 * - /api/v1/issued-tickets/{issuedTicketId}
 */
export interface IssuedTicketDetailResponse extends TicketsRequestBody {
  id: number;
  privateTutor: {
    id: number;
    type: 'ADMIN' | 'STAFF';
    loginId: string;
    name: string;
    phone: string;
    isActive: boolean;
    createdAt: string; // dateTime;
    updatedAt: string; // dateTime;
    lastLoginedAt: string; // dateTime;
  };
  startAt: string; // date;
  endAt: string; // date;
  remainingCount: number;
  availableReservationCount: number;
  serviceCount: number;
  isSuspended: boolean;
  suspendedAt: string; // dateTime;
  isCanceled: boolean;
  canceledAt: string; // dateTime;
  createdAt: string; // dateTime;
  updatedAt: string; // dateTime;
  message: string;
}

/**
 * - [post] 수강권 부여 (회원에게 발급)
 * - /api/v1/tickets/{ticketId}/issue
 */
export interface IssueTicketForMemberRequest {
  memberIds: number[];
  serviceCount: number;
  privateTutorId: number;
  startAt: string; //date
  endAt: string; //date
}

export interface IssueTicketForMemberFormType {
  serviceCount: number;
  startAt: string; //date
  endAt: string; //date
}

/**
 * - [put] 회원 수강권 수정
 * - /api/v1/issued-tickets/{issuedTicketId}
 */
export interface IssueTicketForMemberEditRequest {
  tutorId: number;
  endAt: string; //date
}

export interface IssueTicketForMemberEditFormType {
  endAt: string; //date
}

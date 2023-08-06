import { RequestBody } from './apiInterfaces';
import { MemberSearchType, UsersSearchType } from './schedulesAPIs';

/**
 * [members-C] 회원 등록
 * @필수 `body`
 */
export const members_create: RequestBody<Members_request> = {
  method: 'post',
  url: 'members',
  isBody: true,
  body: {
    name: '홍길동',
    birthDate: '2023-07-22',
    phone: 'string',
    sex: 'MALE',
    job: 'string',
    acqusitionFunnel: 'string',
    acquisitionFunnel: 'string',
    toss: [
      {
        id: 0,
        agree: true,
      },
    ],
  },
};

export type SexType = 'MALE' | 'FEMALE';

/**
 * [members-C] 회원 등록 - `Request Body`
 */
export interface Members_request {
  name: string;
  /**2023-07-22 형식 */
  birthDate: string;
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

/** 회원 리스트 */
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

type ResourcesType = 'USER' | 'MEMBER';

export interface MemberSearchResponse {
  searchParam: {
    query: string;
    resources: ResourcesType[];
  };
  members?: MemberSearchType[];
  users?: UsersSearchType[];
  message?: 'string';
}

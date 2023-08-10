/** Search : 통합검색 */

/**
 * - [get] 통합검색
 * - [query] query, resource ['USER' | 'MEMBER']
 * - /api/v1/search
 */
export interface SearchResponse {
  searchParam: {
    query: string;
    resources: ['USER' | 'MEMBER'];
  };
  members: MemberSearchType[];
  users: UsersSearchType[];
  message: string;
}

/** 회원 통합 검색 - USER */
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

/** 직원 통합 검색 - MEMBER */
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

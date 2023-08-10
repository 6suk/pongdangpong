import { MemberListDatasType } from './membersTypes';
/** Staff : 직원관리 */

/**
 * - [get] 전체 직원 조회
 * - /api/v1/staffs
 * - [query] page, sort
 */
export interface StaffsListResponse {
  meta: {
    totalCount: number;
    size: number;
    count: number;
    page: number;
    hasMore: boolean;
  };
  datas: StaffsListDatasType[];
  message: string;
}

export interface StaffsListDatasType {
  id: number;
  name: string;
  phone: string;
  memberCount: number;
  rating: number;
  memo: string;
}

/**
 * - [post] 직원 생성
 * - /api/v1/staffs
 */
interface StaffsRequestBody {
  loginId: string;
  password: string;
  name: string;
  phone: string;
  roles: number[];
}

export const StaffFormInit: StaffsRequestBody = {
  loginId: '',
  password: '',
  name: '',
  phone: '',
  roles: [],
};

/**
 * - [get] 역할 조회
 * - /api/v1/roles
 */
export interface RolesResponse {
  roles: RolesRoleType[];
  message: string;
}

export interface RolesRoleType {
  id: number;
  name: string;
  description: string;
  permissions: [
    {
      title: string;
      description: string;
    },
  ];
}

/**
 * - [get] 직원 상세 조회
 * - /api/v1/staffs/{userId}
 */
export interface StaffsDetailResponse {
  id: number;
  type: StaffTypesType;
  name: string;
  phone: string;
  active: boolean;
  createdAt: string; // date-time
  updatedAt: string; // date-time
  loginId: string;
  memo: string;
  pwdChangeRequired: boolean;
  roles: [
    {
      id: number;
      name: string;
    },
  ];
  members: MemberListDatasType[];
  lastLoginedAt: string; // date-time
  prescriptionReviews: [
    {
      id: number;
      privateTutor: {
        id: number;
        name: string;
      };
      member: {
        id: number;
        name: string;
        phone: string;
      };
      rating: number;
      content: string;
      createdAt: string; // date-time
    },
  ];
  message: string;
}

export type StaffTypesType = 'ADMIN' | 'STAFF';

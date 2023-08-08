import { MemberListDatasType } from './membersAPIs';

export interface staffs_list_type {
  meta: {
    totalCount: number;
    size: number;
    count: number;
    page: number;
    hasMore: boolean;
  };
  datas: Staffs_list_dats_type[];
  message: string;
}

export interface Staffs_list_dats_type {
  id: number;
  name: string;
  phone: string;
  memberCount: number;
  rating: number;
  memo: string;
}

interface Staffs_form_type {
  loginId: string;
  password: string;
  name: string;
  phone: string;
  roles: number[];
}

export const staff_form: Staffs_form_type = {
  loginId: '',
  password: '',
  name: '',
  phone: '',
  roles: [],
};

export interface Roles_response {
  roles: Roles[];
  message: string;
}

export interface Roles {
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

/** 직원 디테일 */
export type StaffType = 'ADMIN' | 'STAFF';

export interface StaffDetailResponseType {
  id: number;
  type: StaffType;
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

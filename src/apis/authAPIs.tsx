import { APIState } from './apiInterfaces';

/**
 * [auth] 토큰 갱신
 */
export const auth_refresh_tokens: APIState = {
  url: `http://223.130.161.221/api/v1/tokens`,
  method: 'post',
};

/**
 * [auth] 관리자 로그인
 */
export const auth_admin_login: APIState = {
  url: 'admins/login',
  method: 'post',
};

/**
 * [auth] 로그아웃
 */
export const auth_logout: APIState = {
  url: 'logout',
  method: 'post',
};

export interface MeType {
  id: number;
  type: 'ADMIN' | 'STAFF';
  loginId: string;
  name: string;
  phone: string;
  active: true;
  pwdChangeRequired: true;
  roles: [
    {
      id: number;
      name: string;
    },
  ];
  permissions: ['SETTING', 'STAFF', 'RECORD_TEMPLATE', 'RECORD', 'LESSON', 'SCHEDULE', 'ARCHIVE_LINK'];
  agreeTosRequired: true;
  toss: [
    {
      id: number;
      title: string;
      content: string;
      required: true;
    },
  ];
  hashKey: string;
  center: {
    id: number;
    name: string;
    code: string;
    phone: string;
  };
  message: string;
}

export interface MeCenterType {
  id: number;
  name: string;
  centerCode: string;
  phone: string;
  contactLink: string;
}

export interface MeSummaryType {
  center: {
    staffCount: number;
    memberCount: number;
    myMemberCount: number;
  };
  mySchedule: {
    counselingCount: number;
    lessonCount: number;
  };
  message: string;
}

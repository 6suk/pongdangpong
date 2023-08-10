import { APIState } from './apiInterfaces';

export const BasePath = 'http://223.130.161.221/api/v1';

export const AuthRefreshTokenPath: APIState = {
  url: `http://223.130.161.221/api/v1/tokens`,
  method: 'post',
};

export const AuthAdminLoginPath: APIState = {
  url: 'admins/login',
  method: 'post',
};
export const AuthLogoutPath: APIState = {
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

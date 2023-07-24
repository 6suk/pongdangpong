import { APIState } from './apiInterfaces';

/**
 * [me-R] 내정보
 */
export const me_info: APIState = {
  method: 'get',
  url: 'me',
};

/**
 * [me-R] 내정보 - `Response`
 */
export interface Me_info_response {
  id: number;
  type: 'ADMIN' | 'STAFF';
  loginId: string;
  name: string;
  phone: string;
  active: boolean;
  pwdChangeRequired: boolean;
  roles: [
    {
      id: number;
      name: string;
    },
  ];
  permissions: ['SETTING' | 'STAFF' | 'RECORD_TEMPLATE' | 'RECORD' | 'LESSON' | 'SCHEDULE' | 'ARCHIVE_LINK'];
  agreeTosRequired: boolean;
  toss: [
    {
      id: number;
      title: string;
      content: string;
      required: boolean;
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

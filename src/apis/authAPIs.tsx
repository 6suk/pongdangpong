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

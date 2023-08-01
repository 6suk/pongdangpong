import axios from 'axios';

import { store } from '@stores/store';

import { auth_admin_login, auth_logout, auth_refresh_tokens } from './authAPIs';

export const BASE_URL = 'http://223.130.161.221/api/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const { accessToken, refreshToken } = store.getState().tokens;

    switch (config.url) {
      // id, pwd 필요
      case auth_admin_login.url:
        break;

      // Refresh Token 필요
      case auth_logout.url:
        if (refreshToken) config.headers.Authorization = `Bearer ${refreshToken}`;
        break;

      // Access Token 필요
      default:
        if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
        break;
    }
    return config;
  },
  error => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  response => response,

  async error => {
    const { url, method } = auth_refresh_tokens;
    const originalRequest = error.config;
    const storeRefreshToken = store.getState().tokens.refreshToken;

    if (error.response && error.response.status === 401 && storeRefreshToken && !originalRequest._retry) {
      console.log('Token Expiration');
      try {
        const response = await axios[method](
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${storeRefreshToken}`,
            },
          }
        );
        const { accessToken, refreshToken } = response.data;
        setTokens(accessToken, refreshToken);
        console.log('Token Refresh Success');
        return axiosInstance(originalRequest); // 원래 요청 다시 보내기
      } catch (error) {
        console.log(error);
        throw error; // 토큰 갱신 요청이 실패하면 에러 던지기
      }
    }
    return Promise.reject(error);
  }
);

const setTokens = (accessToken: string | null, refreshToken: string | null) => {
  if (accessToken && refreshToken) {
    store.dispatch({
      type: 'tokens/setTokens',
      payload: {
        accessToken,
        refreshToken,
      },
    });
  }
};

export default axiosInstance;

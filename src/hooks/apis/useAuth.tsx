import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';
import { mutate } from 'swr';

import { auth_logout } from '@apis/authAPIs';
import axiosInstance from '@apis/axiosInstance';
import { clearTokens, setTokens } from '@stores/tokenSilce';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const login = useCallback(
    async (isAdmin: boolean, requestData: { loginId: string; password: string; centerCode?: string }) => {
      setIsLoading(true);
      const { loginId, password, centerCode } = requestData;
      const requestPath = isAdmin ? `admins/login` : `staffs/login?centerCode=${centerCode}`;

      try {
        const response = await axiosInstance['post'](
          requestPath,
          {},
          {
            headers: {
              Authorization: 'Basic ' + btoa(loginId + ':' + password),
            },
          }
        );
        const { accessToken, refreshToken } = response.data;
        dispatch(setTokens({ accessToken, refreshToken }));
      } catch (error) {
        setAuthError(error instanceof AxiosError ? error.response?.data.message : 'error!');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  const clearCache = () => mutate(() => true, undefined, { revalidate: false });

  const logout = useCallback(async () => {
    const { url, method } = auth_logout;
    setIsLoading(true);
    try {
      await axiosInstance[method](url);
    } catch (error) {
      setAuthError(error instanceof AxiosError ? error.response?.data.message : 'error!');
      throw error;
    } finally {
      dispatch(clearTokens());
      clearCache();
      setIsLoading(false);
    }
  }, [dispatch]);

  return {
    login,
    logout,
    isLoading,
    authError,
  };
};

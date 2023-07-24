import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';
import { mutate } from 'swr';

import { auth_admin_login, auth_logout } from '@apis/authAPIs';
import axiosInstance from '@apis/axiosInstance';
import { clearTokens, setTokens } from '@stores/tokenSilce';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<unknown>(null);
  const dispatch = useDispatch();

  const login = useCallback(
    async (loginId: string, password: string) => {
      const { url, method } = auth_admin_login;
      setIsLoading(true);
      try {
        const response = await axiosInstance[method](
          url,
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
        setAuthError(error instanceof AxiosError ? error.response?.data.message : error);
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
      dispatch(clearTokens());
      clearCache();
    } catch (error) {
      setAuthError(error);
    } finally {
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

import { useCallback, useState } from 'react';

import { AxiosError } from 'axios';
import { mutate } from 'swr';

import { method } from '@apis/apiInterfaces';
import axiosInstance from '@apis/axiosInstance';

export interface reqDataState {
  url: string;
  method: method;
  path?: string;
  body?: object;
}

export const useRequests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const request = useCallback(async (data: reqDataState) => {
    const { url, method, path, body } = data;
    setError(null);
    setIsLoading(true);
    try {
      const requestPath = path ? url + path : url;

      switch (method) {
        case 'get':
        case 'delete':
          await axiosInstance[method](requestPath);
          break;
        case 'put':
        case 'post':
          await axiosInstance[method](requestPath, body);
          break;
      }
      mutate(url);
    } catch (error) {
      if (error instanceof AxiosError) setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { request, isLoading, error };
};

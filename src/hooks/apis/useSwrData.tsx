import useSWR from 'swr';

import axiosInstance from '@apis/axiosInstance';

const fetcher = (url: 'string') => axiosInstance.get(url).then(response => response.data);

export const useSwrData = (url: string | null) => {
  const { data, error } = useSWR(url, fetcher, {
    shouldRetryOnError: false,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

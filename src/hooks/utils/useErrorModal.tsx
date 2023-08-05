import { useState } from 'react';

import { AxiosError } from 'axios';

import { ErrorResponse } from '@components/schedules/form/PrivateLessonForm';

export const useErrorModal = () => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorModal, setErrorModal] = useState({ title: '', content: '' });

  // AxiosError
  const handleAxiosError = (error: unknown, title: string) => {
    const axiosError = error as AxiosError<ErrorResponse>;
    const errorData = axiosError.response?.data;
    const content = errorData?.message || '다시 시도해 주세요!';
    setErrorModal({ title, content });
    setIsErrorModalOpen(true);
  };

  // 직접 작성하는 에러
  const handleModalNotice = (title: string, content: string) => {
    setErrorModal({ title, content });
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return { isErrorModalOpen, errorModal, handleAxiosError, handleModalNotice, closeErrorModal };
};

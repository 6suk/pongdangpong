import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

import { mutate } from 'swr';

import { StatusType } from '@apis/types/schedulesTypes';
import { Modal } from '@components/common/Modal';
import { NoticeModal } from '@components/common/NoticeModal';
import { useRequests } from '@hooks/apis/useRequests';
import { useErrorModal } from '@hooks/utils/useErrorModal';
import { ModalButton } from '@styles/modal/modalStyle';
import theme from '@styles/theme';

export const StatusButton = ({ status, buttonType, children, attendanceHistoryId }: StatusButtonProps) => {
  let className = 'default';
  const { pathname } = useLocation();
  const [isOpen, setIsOpne] = useState(false);
  const { request, isLoading } = useRequests();
  const requestURL = buttonTypeEnum[buttonType].toLocaleLowerCase();
  const modalInnerNotice = innerNotice[buttonType];
  const { errorModal, closeErrorModal, handleAxiosError, isErrorModalOpen } = useErrorModal();

  if (status === buttonTypeEnum[buttonType]) {
    switch (status) {
      case 'PRESENT':
        className = 'present';
        break;
      case 'ABSENT':
        className = 'absent';
        break;
    }
  }

  const handleModalOpen = () => {
    if (status === buttonTypeEnum[buttonType]) return;
    setIsOpne(true);
  };

  const handleSubmit = async () => {
    try {
      await request({
        method: 'post',
        url: `attendance-histories/${attendanceHistoryId}/check-${requestURL}`,
      });
      mutate(pathname);
      if (!isLoading) setIsOpne(false);
    } catch (error) {
      if (!isLoading) setIsOpne(false);
      handleAxiosError(error, `Error!`);
    }
  };

  return (
    <>
      <StatusButtonStyle className={className} type="button" onClick={handleModalOpen}>
        {children}
      </StatusButtonStyle>
      {isOpen && (
        <Modal setIsOpen={setIsOpne}>
          <h3>{modalInnerNotice.title}</h3>
          <p>{modalInnerNotice.content}</p>
          <div className="buttonWrapper">
            <ModalButton $isPrimary={true} onClick={handleSubmit}>
              확인
            </ModalButton>
            <ModalButton
              $isPrimary={false}
              onClick={() => {
                setIsOpne(false);
              }}
            >
              취소
            </ModalButton>
          </div>
        </Modal>
      )}
      {/* 에러 모달 */}
      {isErrorModalOpen && <NoticeModal innerNotice={errorModal} setIsOpen={closeErrorModal} />}
    </>
  );
};

type ButtonType = 'attendance' | 'absence';

interface StatusButtonProps {
  status: StatusType;
  buttonType: ButtonType;
  children?: React.ReactNode;
  attendanceHistoryId: number;
}

const innerNotice = {
  attendance: {
    title: '출석 확인',
    content: '출석 처리 하시겠습니까?',
  },
  absence: {
    title: '결석 처리',
    content: '결석 처리를 진행하시겠습니까?\n결석은 차감된 횟수가 복구되지 않습니다.',
  },
};

const buttonTypeEnum = {
  attendance: 'PRESENT', // 출석
  absence: 'ABSENT', // 결석
};

const StatusButtonStyle = styled.button`
  color: ${theme.colors.gray[200]};
  padding-inline: 1.25rem;
  padding-block: 0.5rem;
  font-size: ${theme.font.sub};
  border-radius: 0.375rem;
  transition: all 0.4s;
  outline: none;
  border: 1px solid ${theme.colors.gray[700]};
  border-radius: 6px;

  &:hover {
    font-weight: 600;
  }

  &.default:hover {
    background-color: ${theme.colors.gray[900]};
  }

  &.present {
    color: white;
    background-color: ${theme.colors.pri[600]};
    border: 1px solid ${theme.colors.pri[500]};
  }

  &.absent {
    color: white;
    background-color: ${theme.colors.RedBack};
    border: 1px solid ${theme.colors.RedBorder};
  }

  &.present:hover,
  &.absent:hover {
    font-weight: 300;
  }
`;

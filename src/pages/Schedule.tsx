import React, { useState, useCallback } from 'react';

import { Routes, Route, useNavigate, useLocation, Outlet } from 'react-router-dom';

import styled from 'styled-components';

import { Button } from '@components/common/Button';
import { Modal } from '@components/common/Modal';

import theme from '@styles/theme';

import { CreateCounseling } from './CreateCounseling';
import { CreateSchedule } from './CreateSchedule';

export const Schedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {location.pathname === '/schedule' && (
        <Button type="submit" onClick={() => setIsModalOpen(true)}>
          + 일정 생성
        </Button>
      )}

      {isModalOpen && (
        <CustomModal setIsOpen={setIsModalOpen}>
          <div>
            <h2>일정 생성</h2>
            <p>일정을 생성해 주세요.</p>
          </div>
          <div className="buttonWrapper">
            <ButtonWithText
              iconSrc=""
              leftText="개인 수업"
              leftTextSub="일정 생성"
              onClick={() => {
                setIsModalOpen(false);
                navigate('/schedule/createschedule');
              }}
            />
            <ButtonWithText
              iconSrc=""
              leftText="그룹 수업"
              leftTextSub="일정 생성"
              onClick={() => {
                setIsModalOpen(false);
                navigate('/schedule/createschedule');
              }}
            />
            <ButtonWithText
              iconSrc=""
              leftText="상담"
              leftTextSub="일정 생성"
              onClick={() => {
                setIsModalOpen(false);
                navigate('/schedule/createcounseling');
              }}
            />
          </div>
        </CustomModal>
      )}

      <Routes>
        <Route element={<CreateSchedule />} path="createschedule" />
        <Route element={<CreateCounseling />} path="createcounseling" />
      </Routes>
      <Outlet />
    </>
  );
};

const CustomModal = styled(Modal)`
  max-width: 40rem;
  text-align: left;

  div {
    text-align: left;
  }

  h2 {
    color: ${theme.colors.pri[800]};
    font-size: ${theme.font.title};
    font-weight: bold;
    margin-bottom: 1rem;
  }

  p {
    color: ${theme.colors.gray[500]};
    font-size: ${theme.font.body};
  }
`;

const MyButton = styled.button`
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: white;
  border: 1px solid ${theme.colors.gray[600]};
  border-radius: 0.5rem;
  cursor: pointer;
  position: relative;

  .button-text-left {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    flex-direction: column;
  }
  .button-text-left-sub {
    position: absolute;
    top: 40px;
    left: 10px;
    display: flex;
    flex-direction: column;
  }

  .button-text-right {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .icon-wrapper {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .icon {
    width: 20px;
    height: 20px;
  }
`;

interface ButtonProps {
  leftText: string;
  leftTextSub: string;
  iconSrc: string;
  $isPrimary?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

export const ButtonWithText: React.FC<ButtonProps> = ({ leftText, leftTextSub, iconSrc, onClick }) => {
  return (
    <MyButton onClick={onClick}>
      <div className="button-text-left">{leftText}</div>
      <div className="button-text-left-sub">{leftTextSub}</div>
      <div className="button-text-right">
        <img alt="icon" src={iconSrc} />
      </div>
    </MyButton>
  );
};

export default Schedule;

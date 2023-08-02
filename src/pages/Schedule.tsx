import React, { useState, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation, Outlet } from 'react-router-dom';

import styled from 'styled-components';

import { Button } from '@components/common/Button';
import { Modal } from '@components/common/Modal';

import CreateCounseling from '@components/schedules/CreateCounseling';
import CreateSchedule from '@components/schedules/CreateSchedule';
import ScheduleModal from '@components/schedule/ScheduleModal';

import theme from '@styles/theme';

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
      <ScheduleModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} navigate={navigate} />

      <Routes>
        <Route element={<CreateSchedule />} path="createschedule" />
        <Route element={<CreateCounseling />} path="createcounseling" />
      </Routes>
      <Outlet />
    </>
  );
};

export default Schedule;

import { useState } from 'react';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@components/common/Button';

import CreateCounseling from '@components/schedules/backup/CreateCounseling';
import CreateSchedule from '@components/schedules/backup/CreateSchedule';
import { SchedulesFormModal } from '@components/schedules/form/SchedulesFormModal';

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
      {isModalOpen && <SchedulesFormModal setIsOpen={setIsModalOpen} />}

      <Routes>
        <Route element={<CreateSchedule />} path="createschedule" />
        <Route element={<CreateCounseling />} path="createcounseling" />
      </Routes>
      <Outlet />
    </>
  );
};

export default Schedule;

import { Route, Routes } from 'react-router-dom';

import { SchedulesList } from '@components/schedules/SchedulesList';

import CreateCounseling from './CreateCounseling';
import CreateSchedule from './CreateSchedule';

export const Schedules = () => {
  return (
    <Routes>
      <Route index element={<SchedulesList />} path="" />
      <Route element={<CreateSchedule />} path="private-lesson/new" />
      <Route element={<CreateCounseling />} path="counseling/new" />
    </Routes>
  );
};

import { Route, Routes } from 'react-router-dom';

import CreateCounseling from '@components/schedules/CreateCounseling';
import CreateSchedule from '@components/schedules/CreateSchedule';
import { SchedulesList } from '@components/schedules/SchedulesList';

export const Schedules = () => {
  return (
    <Routes>
      <Route index element={<SchedulesList />} path="" />
      <Route element={<CreateSchedule />} path="private-lesson/new" />
      <Route element={<CreateCounseling />} path="counseling/new" />
    </Routes>
  );
};

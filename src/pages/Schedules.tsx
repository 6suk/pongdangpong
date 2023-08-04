import { Route, Routes } from 'react-router-dom';

import { CounselingForm } from '@components/schedules/CounselingForm';
import { PrivateForm } from '@components/schedules/PrivateForm';
import { SchedulesHome } from '@components/schedules/SchedulesHome';

export const Schedules = () => {
  return (
    <Routes>
      <Route index element={<SchedulesHome />} path="" />
      <Route element={<PrivateForm />} path="private-lesson/new" />
      <Route element={<CounselingForm />} path="counseling/new" />
    </Routes>
  );
};

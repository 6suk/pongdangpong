import { Route, Routes } from 'react-router-dom';

import { SchedulesHome } from '@components/schedules/calendar/SchedulesHome';
import { PrivateLessonDetail } from '@components/schedules/details/PrivateLessonDetail';
import { CounselingForm } from '@components/schedules/form/CounselingForm';
import { PrivateLessonForm } from '@components/schedules/Form/PrivateLessonForm';

export const Schedules = () => {
  return (
    <Routes>
      <Route index element={<SchedulesHome />} path="" />
      <Route path="private-lesson">
        <Route element={<PrivateLessonForm />} path="new" />
        <Route element={<PrivateLessonDetail />} path=":scheduleId" />
      </Route>
      <Route path="counseling">
        <Route element={<CounselingForm />} path="new" />
        <Route element={<CounselingForm />} path=":scheduleId" />
      </Route>
    </Routes>
  );
};

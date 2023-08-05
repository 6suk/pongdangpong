import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { SchedulesHome } from '@components/schedules/calendar/SchedulesHome';
import { CounselingDetail } from '@components/schedules/details/CounselingDetail';
import { PrivateLessonDetail } from '@components/schedules/details/PrivateLessonDetail';
import { CounselingForm } from '@components/schedules/form/CounselingForm';
import { PrivateLessonForm } from '@components/schedules/form/PrivateLessonForm';
import { clearSelectedDate } from '@stores/selectedDateSlice';

export const Schedules = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSelectedDate());
    };
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<SchedulesHome />} path="" />
      <Route path="private-lesson">
        <Route element={<PrivateLessonForm />} path="new" />
        <Route element={<PrivateLessonForm isEditMode={true} />} path=":scheduleId/edit" />
        <Route element={<PrivateLessonDetail />} path=":scheduleId" />
      </Route>
      <Route path="counseling">
        <Route element={<CounselingForm />} path="new" />
        <Route element={<CounselingForm isEditMode={true} />} path=":scheduleId/edit" />
        <Route element={<CounselingDetail />} path=":scheduleId" />
      </Route>
    </Routes>
  );
};

import { Route, Routes } from 'react-router-dom';

import { StaffsDetail } from '@components/center/staff/StaffsDetail';
import { StaffsForm } from '@components/center/staff/StaffsForm';
import { StaffsFormCompleted } from '@components/center/staff/StaffsFormCompleted';
import { StaffsList } from '@components/center/staff/StaffsList';
import { TicketEditForm } from '@components/center/ticket/TicketEditForm';
import { TicketForm } from '@components/center/ticket/TicketForm';
import { TicketIssued } from '@components/center/ticket/TicketIssued';
import { TicketList } from '@components/center/ticket/TicketList';

export const Center = () => {
  return (
    <>
      <Routes>
        <Route path="tickets">
          <Route index element={<TicketList />} path="" />
          <Route element={<TicketForm />} path="new" />
          <Route element={<TicketIssued />} path=":id/issued-tickets" />
          <Route element={<TicketEditForm />} path=":id/edit" />
        </Route>
        <Route path="staffs">
          <Route index element={<StaffsList />} path="" />
          <Route index element={<StaffsForm />} path="new" />
          <Route index element={<StaffsFormCompleted />} path="new/completion/:id/:name" />
          <Route index element={<StaffsDetail />} path=":id" />
        </Route>
      </Routes>
    </>
  );
};

export default Center;

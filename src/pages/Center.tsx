import { Route, Routes } from 'react-router-dom';

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
      </Routes>
    </>
  );
};

export default Center;

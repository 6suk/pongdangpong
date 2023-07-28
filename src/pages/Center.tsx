import { Route, Routes } from 'react-router-dom';

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
        </Route>
      </Routes>
    </>
  );
};

export default Center;

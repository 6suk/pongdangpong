import { Route, Routes } from 'react-router-dom';

import { TicketForm } from '@components/tickets/TicketForm';
import { TicketList } from '@components/tickets/TicketList';
import { TicketQuery } from '@components/tickets/TicketQuery';

export const Ticket = () => {
  return (
    <>
      <h1>Tiket</h1>
      <Routes>
        <Route element={<TicketList />} path="list" />
        <Route element={<TicketForm />} path="create" />
        <Route element={<TicketQuery />} path=":id/issued-tickets" />
      </Routes>
    </>
  );
};

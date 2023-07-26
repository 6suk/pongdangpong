import { Route, Routes } from 'react-router-dom';

import { TicketForm } from '@components/samples/TicketForm';
import { TicketList } from '@components/samples/TicketList';
import { TicketQuery } from '@components/samples/TicketQuery';

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

export default Ticket;

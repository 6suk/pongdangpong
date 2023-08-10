import { Route, Routes } from 'react-router-dom';

import { STicketForm } from '@components/samples/STicketForm';
import { STicketList } from '@components/samples/STicketList';
import { STicketQuery } from '@components/samples/STicketQuery';

export const Sample = () => {
  return (
    <>
      <h1>Tiket</h1>
      <Routes>
        <Route element={<STicketList />} path="list" />
        <Route element={<STicketForm />} path="create" />
        <Route element={<STicketQuery />} path=":id/issued-tickets" />
      </Routes>
    </>
  );
};

export default Sample;

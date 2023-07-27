import { Route, Routes } from 'react-router-dom';

import { TicketList } from '@components/center/ticket/TicketList';

export const Center = () => {
  return (
    <>
      <Routes>
        <Route element={<TicketList />} path="tickets" />
      </Routes>
    </>
  );
};

export default Center;

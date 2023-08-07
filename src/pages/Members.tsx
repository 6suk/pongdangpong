import { Route, Routes } from 'react-router-dom';

import { MemberDetail } from '@components/members/detail/MemberDetail';
import { MemberEdit } from '@components/members/detail/MemberEdit';
import { MemberAddTicket } from '@components/members/issue/MemberAddTicket';
import { SelectedTicket } from '@components/members/issue/SelectedTicket';
import { MemberList } from '@components/members/list/MemberList';
import { MembersResgier } from '@components/members/MembersRegister';

export const Members = () => {
  return (
    <Routes>
      <Route index element={<MemberList />} path="" />
      <Route element={<MembersResgier />} path="new" />
      <Route element={<MemberDetail />} path=":id" />
      <Route element={<MemberEdit />} path=":id/edit" />
      <Route element={<SelectedTicket />} path=":id/tickets" />
      <Route element={<MemberAddTicket />} path=":id/tickets/:ticketId/issue" />
    </Routes>
  );
};

export default Members;

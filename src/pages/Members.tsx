import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { MemberDetail } from '@components/members/detail/MemberDetail';
import { MemberEdit } from '@components/members/detail/MemberEdit';
import { MemberAddTicket } from '@components/members/issue/MemberAddTicket';
import { SelectedTicket } from '@components/members/issue/SelectedTicket';
import { MemberList } from '@components/members/list/MemberList';
import { MembersResgier } from '@components/members/MembersRegister';
import { clearAll } from '@stores/findUsersSlice';

export const Members = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearAll());
    };
  }, [dispatch]);

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

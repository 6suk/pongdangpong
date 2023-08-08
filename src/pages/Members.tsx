import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { MemberDetail } from '@components/members/detail/MemberDetail';
import { IssueTicketEditForm } from '@components/members/issue/IssueTicketEditForm';
import { IssueTickeForm } from '@components/members/issue/IssueTicketForm';
import { SelectedTicket } from '@components/members/issue/SelectedTicket';
import { MemberList } from '@components/members/list/MemberList';
import { MemberEditForm } from '@components/members/MemberEditForm';
import { MembersForm } from '@components/members/MembersForm';
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
      <Route element={<MemberDetail />} path=":memberId" />
      <Route element={<MembersForm />} path="new" />
      <Route element={<MemberEditForm />} path=":memberId/edit" />
      <Route element={<SelectedTicket />} path=":memberId/tickets" />
      <Route element={<IssueTickeForm />} path=":memberId/tickets/:ticketId/new" />
      <Route element={<IssueTicketEditForm />} path=":memberId/tickets/:issuedTicketId/edit" />
    </Routes>
  );
};

export default Members;

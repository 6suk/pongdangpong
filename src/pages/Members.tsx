import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { IssueTicketEditForm } from '@components/issuedTickets/IssueTicketEditForm';
import { IssueTickeForm } from '@components/issuedTickets/IssueTicketForm';
import { SelectedIssueTicket } from '@components/issuedTickets/SelectedIssueTicket';
import { MemberDetail } from '@components/members/detail/MemberDetail';
import { MemberEditForm } from '@components/members/form/MemberEditForm';
import { MembersForm } from '@components/members/form/MembersForm';
import { MemberList } from '@components/members/list/MemberList';

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
      <Route element={<SelectedIssueTicket />} path=":memberId/tickets" />
      <Route element={<IssueTickeForm />} path=":memberId/tickets/:ticketId/new" />
      <Route element={<IssueTicketEditForm />} path=":memberId/tickets/:issuedTicketId/edit" />
    </Routes>
  );
};

export default Members;

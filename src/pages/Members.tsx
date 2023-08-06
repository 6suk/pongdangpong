import { Route, Routes } from 'react-router-dom';

import { MemberList } from '@components/members/MemberList';

export const Members = () => {
  return (
    <Routes>
      <Route index element={<MemberList />} path="" />
      <Route index element={<MemberList />} path="detail/:id" />
    </Routes>
  );
};

export default Members;

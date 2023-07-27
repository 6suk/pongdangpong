import React from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import { MembersEdit } from './MembersEdit';

const Members = () => {
  const location = useLocation();

  const pathSlice = location.pathname.split('/');
  const currentPathname = pathSlice[pathSlice.length - 1];

  return (
    <div style={{ paddingTop: '40px' }}>
      {currentPathname === 'edit' && <MembersEdit />}
      <Outlet />
    </div>
  );
};

export default Members;

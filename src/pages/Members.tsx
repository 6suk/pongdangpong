import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { MembersEdit } from './MembersEdit';
import { MembersRecord } from './MembersRecord';

const Members = () => {
  const location = useLocation();
  const pathSlice = location.pathname.split('/');
  const currentPathname = pathSlice[pathSlice.length - 1];

  return (
    <div style={{ paddingTop: '40px' }}>
      {currentPathname === 'edit' && <MembersEdit />}
      {currentPathname === 'record' && <MembersRecord />}
      <Outlet />
    </div>
  );
};

export default Members;

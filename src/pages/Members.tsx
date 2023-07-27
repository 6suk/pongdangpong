import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';

const Members = () => {

  const location = useLocation();
  const pathSlice = location.pathname.split('/');
  const currentPathname = pathSlice[pathSlice.length-1];

  return (
    <div style={{paddingTop:"40px"}}>         
      <Outlet/>    
    </div>
  )
}

export default Members
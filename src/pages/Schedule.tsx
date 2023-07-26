import React from 'react'
import { Outlet } from 'react-router-dom';

const Schedule = () => {
  return (<>
    <Outlet/>
    <div>Schedule</div>
    </>
  )
}

export default Schedule
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HomeSummary } from '@components/home/HomeSummary';

export const Home = () => {
  return (
    <>
      <Routes>
        <Route path="">
          <Route index element={<HomeSummary />} path="" />
        </Route>
      </Routes>
    </>
  );
};

export default Home;

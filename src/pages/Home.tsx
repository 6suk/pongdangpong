import { Route, Routes } from 'react-router-dom';

import { HomeSummary } from '@components/home/HomeSummary';
import { SearchResult } from '@components/home/SearchResult';

export const Home = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route index element={<HomeSummary />} path="" />
          <Route element={<SearchResult />} path="/search" />
        </Route>
      </Routes>
    </>
  );
};

export default Home;

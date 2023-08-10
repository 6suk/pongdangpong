import { Route, Routes } from 'react-router-dom';

import { MyInfo } from '@components/mypage/MyInfo';

export const Mypage = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route index element={<MyInfo />} path="" />
        </Route>
      </Routes>
    </>
  );
};

export default Mypage;

import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { Layout, PrivateRoute, PublicRoute } from '@/index';
import { Schedules } from '@/pages/Schedules';
import { RootState } from '@stores/store';

import theme from '@styles/theme';

function App() {
  const Login = lazy(() => import('@/pages/Login'));
  const Home = lazy(() => import('@/pages/Home'));
  const Center = lazy(() => import('@/pages/Center'));
  const Mypage = lazy(() => import('@/pages/Mypage'));
  const Sample = lazy(() => import('@/pages/Sample'));
  const Members = lazy(() => import('@components/members/Members'));

  const isLogin = useSelector((state: RootState) => state.tokens.isLogin);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<PublicRoute isLogin={isLogin} />}>
                <Route element={<Login />} path="login/*" />
              </Route>
              <Route element={<PrivateRoute isLogin={isLogin} />}>
                <Route element={<Home />} path="/" />
                <Route element={<Members />} path="members/*" />
                <Route element={<Sample />} path="sample/*" />
                <Route element={<Mypage />} path="mypage" />
                <Route element={<Center />} path="center/*" />
                <Route element={<Schedules />} path="schedules/*" />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export interface PropsState {
  isLogin: boolean;
  info?: string;
}

export default App;

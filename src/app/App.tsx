import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { Layout, PrivateRoute, PublicRoute } from '@/index';
import { RootState } from '@stores/store';

import theme from '@styles/theme';

function App() {
  const Login = lazy(() => import('@/pages/Login'));
  const Home = lazy(() => import('@/pages/Home'));
  const Schedule = lazy(() => import('@/pages/Schedule'));
  const Center = lazy(() => import('@/pages/Center'));
  const Me = lazy(() => import('@/pages/Me'));
  const Sample = lazy(() => import('@/pages/Sample'));
  const Members = lazy(() => import('@/pages/Members'));

  const isLogin = useSelector((state: RootState) => state.tokens.isLogin);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<PublicRoute isLogin={isLogin} />}>
                <Route element={<Login />} path="login" />
              </Route>
              <Route element={<PrivateRoute isLogin={isLogin} />}>
                <Route element={<Home />} path="/" />
                <Route element={<Members />} path="members/*" />
                <Route element={<Schedule />} path="schedule/*" />
                <Route element={<Sample />} path="sample/*" />
                <Route element={<Me />} path="me" />
                <Route element={<Center />} path="center/*" />
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

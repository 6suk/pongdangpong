import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { Layout, PrivateRoute, PublicRoute } from '@/index';
import { Schedules } from '@/pages/Schedules';
import { Loading } from '@components/common/Loading';

import theme from '@styles/theme';

function App() {
  const Login = lazy(() => import('@/pages/Login'));
  const Home = lazy(() => import('@/pages/Home'));
  const Center = lazy(() => import('@/pages/Center'));
  const Mypage = lazy(() => import('@/pages/Mypage'));
  const Members = lazy(() => import('@/pages/Members'));

  return (
    <>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<PublicRoute />}>
                <Route element={<Login />} path="login/*" />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route element={<Home />} path="home/*" />
                <Route element={<Members />} path="members/*" />
                <Route element={<Mypage />} path="mypage" />
                <Route element={<Center />} path="center/*" />
                <Route element={<Schedules />} path="schedules/*" />
              </Route>
            </Route>
            <Route element={<Navigate to={'/home'} />} path="*" />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;

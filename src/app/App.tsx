import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Layout, PrivateRoute, PublicRoute } from '@/index';
import { RootState } from '@stores/store';
import theme from '@styles/theme';
import { Suspense, lazy } from 'react';
import { ThemeProvider } from 'styled-components';

function App() {
  const Login = lazy(() => import('@/pages/Login'));
  const Home = lazy(() => import('@/pages/Home'));
  const Schedule = lazy(() => import('@/pages/Schedule'));
  const Center = lazy(() => import('@/pages/Center'));
  const Me = lazy(() => import('@/pages/Me'));
  const Members = lazy(() => import('@/pages/Members'));
  const Ticket = lazy(() => import('@/pages/Ticket'));

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
                <Route element={<Home />} path="/" >

                </Route>
                <Route element={<Schedule/>} path="/schedule">
                  <Route element={<h2>수강권 관리</h2>} path="ticketManagement" ></Route>
                  <Route element={<h2>회원수정</h2>} path="member" ></Route>
                </Route>                
                <Route element={<Members/>} path="/members" >
                  <Route element={<h2>기록지</h2>} path='record'></Route>
                  <Route element={<h2>만족도 및 후기</h2>} path='review'></Route>
                  <Route element={<h2>앨범</h2>} path='album'></Route>
                </Route>
                <Route element={<Center/>} path="/center">

                </Route>
                <Route element={<Ticket />} path="tickets/*">

                </Route>
                <Route element={<Me />} path="me">

                </Route>
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

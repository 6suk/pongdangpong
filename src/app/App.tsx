import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { lazy, Suspense } from 'react';

import { Header, PrivateRoute, PublicRoute } from '@/index';
import { RootState } from '@stores/store';
import theme from '@styles/theme';
import { ThemeProvider } from 'styled-components';

function App() {
  const Login = lazy(() => import('@/pages/Login'));
  const Home = lazy(() => import('@/pages/Home'));
  const Me = lazy(() => import('@/pages/Me'));
  const Ticket = lazy(() => import('@/pages/Ticket'));

  const isLogin = useSelector((state: RootState) => state.tokens.isLogin);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="container mx-auto max-w-md flex items-center mt-10">
            <div className="content text-center">
              {isLogin && <Header />}
              <Routes>
                <Route element={<PublicRoute isLogin={isLogin} />}>
                  <Route element={<Login />} path="login" />
                </Route>
                <Route element={<PrivateRoute isLogin={isLogin} />}>
                  <Route element={<Home />} path="/" />
                  <Route element={<Ticket />} path="tickets/*" />
                  <Route element={<Me />} path="me" />
                </Route>
              </Routes>
            </div>
          </div>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export interface PropsState {
  isLogin: boolean;
}

export default App;

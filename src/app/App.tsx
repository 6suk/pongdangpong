import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Header, Home, Login, Me, PrivateRoute, PublicRoute, Ticket } from '@/index';
import { RootState } from '@stores/store';

function App() {
  const isLogin = useSelector((state: RootState) => state.tokens.isLogin);

  return (
    <>
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
    </>
  );
}

export interface PropsState {
  isLogin: boolean;
}

export default App;

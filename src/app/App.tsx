import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { GlobalNavigation, GlobalHeader, SubHeader, Home, Login, Me, PrivateRoute, PublicRoute, Ticket } from '@/index';
import { RootState } from '@stores/store';



function App() {
  const isLogin = useSelector((state: RootState) => state.tokens.isLogin);
  
  return (
    <>
    <div className="container mx-auto max-w-md flex justify-center mt-10 pt-[6.5rem]">
        <div className="content text-center">
          <GlobalHeader isLogin={isLogin}/>
          {isLogin && <SubHeader  isLogin={isLogin}/>}
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
          <GlobalNavigation/>
        </div>
      </div>
    </>
  );
}

export interface PropsState {
  isLogin: boolean;
  info?: string;
}

export default App;

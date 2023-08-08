import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { RootState } from '@stores/store';

export const PrivateRoute = () => {
  const isLogin = useSelector((state: RootState) => state.tokens.isLogin);
  return isLogin ? <Outlet /> : <Navigate to={'/login'} />;
};

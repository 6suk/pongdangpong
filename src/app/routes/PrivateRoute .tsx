import { Navigate, Outlet } from 'react-router-dom';

import { PropsState } from '@/app/App';

export const PrivateRoute: React.FC<PropsState> = ({ isLogin }) => {
  return isLogin ? <Outlet /> : <Navigate to={'/login'} />;
};

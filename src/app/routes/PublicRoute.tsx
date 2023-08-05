import { Navigate, Outlet } from 'react-router-dom';

import { PropsState } from '@/app/App';

export const PublicRoute: React.FC<PropsState> = ({ isLogin }) => {
  return isLogin ? <Navigate to={'/'} /> : <Outlet />;
};

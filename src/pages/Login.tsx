import { Route, Routes } from 'react-router-dom';

import { LoginForm } from '@components/login/LoginForm';
import { LoginLayout } from '@components/login/LoginLayout';

export const Login = () => {
  return (
    <Routes>
      <Route element={<LoginLayout />} path="">
        <Route index element={<LoginForm />} />
        <Route element={<LoginForm />} path="staff" />
      </Route>
    </Routes>
  );
};

export default Login;

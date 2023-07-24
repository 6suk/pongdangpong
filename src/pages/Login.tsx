import * as React from 'react';

import { useAuth } from '@hooks/apis/useAuth';
import useInput from '@hooks/utils/useInput';

const initForm = {
  loginId: '',
  password: '',
};

export const Login = () => {
  const { login, isLoading, authError } = useAuth();
  const [inputValues, handleInputChange, inputReset] = useInput(initForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { loginId, password } = inputValues;
    await login(loginId, password);
    inputReset(true);
  };

  return (
    <>
      <h1>로그인</h1>
      {!isLoading ? (
        <form onSubmit={handleSubmit}>
          <input name="loginId" placeholder="id" type="text" value={inputValues.loginId} onChange={handleInputChange} />
          <input
            autoComplete="off"
            name="password"
            placeholder="password"
            type="password"
            value={inputValues.password}
            onChange={handleInputChange}
          />
          <input type="submit" value="로그인" />
        </form>
      ) : (
        <div>Loading...</div>
      )}

      {authError && <p>{String(authError)}</p>}
    </>
  );
};

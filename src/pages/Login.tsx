import { useState } from 'react';

import styled from 'styled-components';

import { Container, LoginSelect, LoginType, LoginForm, Links } from '@/styles/loginStyle';
import { Button } from '@components/common/Button';
import { useAuth } from '@hooks/apis/useAuth';
import useInput from '@hooks/utils/useInput';
import { SC } from '@styles/styles';
import theme from '@styles/theme';

const initForm = {
  loginId: '',
  password: '',
};

export const Login = () => {
  const { login, isLoading, authError } = useAuth();
  const [inputValues, handleInputChange, inputReset] = useInput(initForm);
  const [selectedLogin, setSelectedLogin] = useState('admin');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { loginId, password } = inputValues;
    await login(loginId, password);
    inputReset();
  };

  return (
    <Container>
      <LoginSelect>
        <LoginType isSelected={selectedLogin === 'admin'} onClick={() => setSelectedLogin('admin')}>
          관리자 로그인
        </LoginType>
        <LoginType isSelected={selectedLogin === 'staff'} onClick={() => setSelectedLogin('staff')}>
          직원 로그인
        </LoginType>
      </LoginSelect>

      {!isLoading ? (
        <LoginForm onSubmit={handleSubmit}>
          <p>아이디</p>
          <SC.InputField
            name="loginId"
            placeholder="id"
            type="text"
            value={inputValues.loginId}
            onChange={handleInputChange}
          />

          <p>비밀번호</p>
          <SC.InputField
            autoComplete="off"
            name="password"
            placeholder="password"
            type="password"
            value={inputValues.password}
            onChange={handleInputChange}
          />

          <Links>
            <a href="searchID">아이디 찾기</a>/<a href="searchPW"> 비밀번호 찾기</a>
          </Links>

          <div style={{ margin: '1rem 0', textAlign: 'center', fontSize: '14px', color: theme.colors.gray[200] }}>
            포인티 계정이 없으세요? |<a href="/signup"> 회원가입</a>
          </div>

          <div style={{ width: '70%', margin: '0 auto', fontSize: '16px' }}>
            <Button size="full" type="submit">
              로그인
            </Button>
          </div>
        </LoginForm>
      ) : (
        <div>Loading...</div>
      )}
      {authError && <p>{String(authError)}</p>}
    </Container>
  );
};

export default Login;

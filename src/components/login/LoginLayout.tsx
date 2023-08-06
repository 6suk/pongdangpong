import { Link, Outlet, useLocation } from 'react-router-dom';

import { Button } from '@components/common/Button';
import { useAuth } from '@hooks/apis/useAuth';
import useInput from '@hooks/utils/useInput';
import { ErrorAndFindWrap, InfoButtons, LoginFormStyle, LoginTop, LoginWrap } from '@styles/loginStyle';

export interface loginFormType {
  loginId: string;
  password: string;
  centerCode?: string;
}

const initForm: loginFormType = {
  loginId: '',
  password: '',
  centerCode: '',
};

export const LoginLayout = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname === '/login' ? true : false;
  const [inputValues, onChange, inputReset] = useInput({ ...initForm });
  const { login, authError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(isAdmin, { ...inputValues });
    } catch (error) {
      inputReset({ ...inputValues, password: '' });
    }
  };

  return (
    <>
      <LoginWrap>
        <LoginTop>
          <div className="login-active">
            <Link className={isAdmin ? 'on' : ''} to="/login">{`관리자 로그인`}</Link>
            <Link className={!isAdmin ? 'on' : ''} to="/login/staff">{`직원 로그인`}</Link>
          </div>
        </LoginTop>
        <LoginFormStyle onSubmit={handleSubmit}>
          <div>
            <Outlet context={{ inputValues, onChange, isAdmin }} />
            <ErrorAndFindWrap>
              {authError && <p className="errorMsg">{authError}</p>}
              <InfoButtons>
                <Link to="/">아이디 찾기</Link>
                <span className="line"></span>
                <Link to="/">비밀번호 찾기</Link>
              </InfoButtons>
            </ErrorAndFindWrap>
          </div>
          <div>
            <Button size="full" type="submit">
              로그인
            </Button>
            <InfoButtons className="center">
              <p className="notice">포인티 계정이 없으세요?</p>
              <span className="line"></span>
              <Link to="/">회원가입</Link>
            </InfoButtons>
          </div>
        </LoginFormStyle>
      </LoginWrap>
    </>
  );
};

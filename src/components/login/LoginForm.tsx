import { useOutletContext } from 'react-router-dom';

import { InputField } from '@components/common/InputField';

import { LoginInputWrap } from '@styles/pages/loginStyle';

import { loginFormType } from './LoginLayout';

interface ContextType {
  inputValues: loginFormType;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  isAdmin: boolean;
}

export const LoginForm = () => {
  const { inputValues, onChange, isAdmin } = useOutletContext<ContextType>();

  return (
    <>
      <LoginInputWrap>
        {!isAdmin && (
          <InputField
            isStartZero={false}
            label="센터코드"
            maxLength={10}
            name="centerCode"
            placeholder="센터코드"
            type="number"
            value={inputValues.centerCode}
            onChange={onChange}
          />
        )}
        <InputField
          isStartZero={false}
          label="아이디"
          name="loginId"
          placeholder="아이디"
          type="text"
          value={inputValues.loginId}
          onChange={onChange}
        />
        <InputField
          autoComplete="off"
          isStartZero={false}
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
          value={inputValues.password}
          onChange={onChange}
        />
      </LoginInputWrap>
    </>
  );
};

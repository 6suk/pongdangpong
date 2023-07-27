import React, { useState } from 'react';

import styled from 'styled-components';

import { Button } from '@components/common/Button';
import theme from '@styles/theme';

type FormInputs = {
  message: string;
  date: string;
  time: string;
  name: string;
  birth: string;
  phone: string;
  email: string;
  id: string;
  password: string;
};

const initialInputs: FormInputs = {
  message: '',
  date: '',
  time: '',
  name: '',
  birth: '',
  phone: '',
  email: '',
  id: '',
  password: '',
};

const Container = styled.div`
  max-width: 2xl;
  margin: auto;
  background-color: white;
  padding: 4rem;
  text-align: left;
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
`;

const InputField = styled.input`
  border: 1px solid #e5e7eb;
  color: #1f2937;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  width: 100%;
  padding: 0.625rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const Input: React.FC = () => {
  const [formInputs, setFormInputs] = useState<FormInputs>(initialInputs);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInputs({
      ...formInputs,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Container>
      <Form>
        <div>
          <Label htmlFor="message">일정 메모</Label>
          <InputField
            id="message"
            value={formInputs.message}
            onChange={handleInputChange}
            placeholder="내용을 입력해 주세요. (500자 이내)"
          />
        </div>
        <div>
          <Label htmlFor="date">일자 선택</Label>
          <InputField type="date" id="date" value={formInputs.date} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="time">시간 선택</Label>
          <InputField type="time" id="time" value={formInputs.time} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="name">이름</Label>
          <InputField
            type="text"
            id="name"
            value={formInputs.name}
            onChange={handleInputChange}
            placeholder="이름을 입력해 주세요"
          />
        </div>
        <div>
          <Label htmlFor="birth">생년월일</Label>
          <InputField
            type="tel"
            id="birth"
            value={formInputs.birth}
            onChange={handleInputChange}
            placeholder="0000.00.00"
            pattern="[0-9]{4}.[0-9]{2}.[0-9]{2}"
          />
        </div>
        <div>
          <Label htmlFor="phone">휴대폰 번호</Label>
          <InputField
            type="tel"
            id="phone"
            value={formInputs.phone}
            onChange={handleInputChange}
            placeholder="000-0000-0000"
            pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
          />
        </div>
        <div>
          <Label htmlFor="id">아이디</Label>
          <InputField type="text" id="id" value={formInputs.id} onChange={handleInputChange} placeholder="아이디" />
        </div>
        <div>
          <Label htmlFor="password">비밀번호</Label>
          <InputField
            type="password"
            id="password"
            value={formInputs.password}
            onChange={handleInputChange}
            placeholder="*******"
          />
        </div>
        <Button type="submit" bgColor="pri" textColor="White" font="sub">
          로그인
        </Button>
      </Form>
    </Container>
  );
};

export default Input;

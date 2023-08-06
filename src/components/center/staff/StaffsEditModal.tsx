import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { styled } from 'styled-components';

import { mutate } from 'swr';

import { Button } from '@components/common/Button';
import { InputField } from '@components/common/InputField';
import { Modal } from '@components/common/Modal';

import { useRequests } from '@hooks/apis/useRequests';
import { useSwrData } from '@hooks/apis/useSwrData';
import useInput from '@hooks/utils/useInput';

import theme from '@styles/theme';

interface StaffEditPropsType {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  id: string | number;
}

export const StaffsEditModal = ({ setIsOpen, id }: StaffEditPropsType) => {
  const { data, isLoading } = useSwrData(`staffs/${id}`);
  const { name, phone, loginId } = data ?? {};
  const [inputValues, onChange, inputReset] = useInput({
    name: name || '',
    phone: phone || '',
    loginId: loginId || '',
  });
  const { request } = useRequests();
  const [error, setError] = useState({
    available: true,
    msg: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error.available) {
      const requestValues = { ...inputValues } as Record<string, string>;
      delete requestValues.loginId;

      try {
        const response = await request({ url: `staffs/${id}`, body: requestValues, method: 'put' });
        mutate(`staffs${window.location.search}`);
        if (response.status === 200) {
          setIsOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateServer = async () => {
    if (phone === inputValues.phone) {
      setError({ available: true, msg: '' });
    } else {
      try {
        const response = await request({
          url: 'staffs/validate/phone',
          method: 'post',
          body: {
            phone: inputValues.phone,
          },
        });
        const msg = response.data.available ? '' : `이미 존재하는 핸드폰 번호입니다.`;
        setError({ available: response.data.available, msg });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (data) {
      inputReset({ name, phone, loginId });
    }
  }, [data]);

  useEffect(() => {
    if (phone !== inputValues.phone && inputValues.phone.length > 0) {
      validateServer();
    }
  }, [inputValues.phone]);

  return (
    !isLoading && (
      <Modal maxWidth="32rem" setIsOpen={setIsOpen}>
        <h3>직원 수정</h3>
        <form onSubmit={handleSubmit}>
          <ModalInInput>
            <InputField label="이름" name="name" type="text" value={inputValues.name} onChange={onChange} />
            <div>
              <InputField
                className="required"
                error={!error.available}
                isStartZero={false}
                label="휴대폰 번호"
                maxLength={13}
                name="phone"
                placeholder="000-0000-0000"
                type="phone"
                value={inputValues.phone}
                onChange={onChange}
              />
              {!error.available && <ErrorMessage>{error.msg}</ErrorMessage>}
            </div>
            <InputField disabled={true} label="아이디" name="loginId" type="text" value={inputValues.loginId} />
            <InputField disabled={true} label="비밀번호" name="password" type="password" value={'******'} />
          </ModalInInput>
          <div className="buttonWrapper">
            <Button isPri={false} size="full" onClick={() => setIsOpen(false)}>
              취소
            </Button>
            <Button size="full" type="submit">
              수정
            </Button>
          </div>
        </form>
      </Modal>
    )
  );
};

const ModalInInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-block: 2rem;

  label {
    text-align: left;
  }

  p {
    text-align: left;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  font-size: ${theme.font.sm} !important;
  color: ${theme.colors.Error} !important;
  margin-bottom: 0 !important;
`;

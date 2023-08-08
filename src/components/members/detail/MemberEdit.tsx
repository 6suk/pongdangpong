import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';

import { Button } from '@components/common/Button';
import { InputField } from '@components/common/InputField';
import { Modal, ModalButton } from '@components/common/Modal';
import { useRequests } from '@hooks/apis/useRequests';
import { useSwrData } from '@hooks/apis/useSwrData';

import useInput from '@hooks/utils/useInput';
import { ValidationProps, useValidation } from '@hooks/utils/useValidation';
import { FormButtonGroup, FormGridContainer } from '@styles/center/ticketFormStyle';
import { Chips, FormContentWrap, SC, TopTitleWrap } from '@styles/styles';
import theme from '@styles/theme';

type MemberFormType = {
  [key: string]: string | number;
  name: string;
  birthDate: number | string;
  phone: string;
  sex: string;
  job: string;
  acquisitionFunnel: string;
};

export const memberForm: MemberFormType = {
  name: '',
  birthDate: '',
  phone: '',
  sex: '',
  job: '',
  acquisitionFunnel: '',
};

const errorCheckInput: ValidationProps[] = [
  { name: 'name', type: 'string' },
  { name: 'birthDate', type: 'string' },
  { name: 'phone', type: 'phone' },
];

export const MemberEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { request } = useRequests();
  const { data } = useSwrData<MemberFormType>(`members/${id}`);
  const [inputValues, onChange, inputReset] = useInput<MemberFormType>(data || { ...memberForm });
  const { checkForErrors, updateValidationError, validationErrors, isSubmit } = useValidation();
  const [isOpen, setIsOpen] = useState(false);
  const [chips, setChips] = useState('FEMALE');
  const isEditMode = false;

  console.log(data);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateFields();
    if (isValid) {
      try {
        await request({
          url: `members/${id}`,
          method: 'put',
          body: { ...inputValues, sex: chips },
        });
        setIsOpen(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validateFields = () => {
    return checkForErrors(errorCheckInput, inputValues);
  };

  useEffect(() => {
    if (isSubmit) validateFields();
  }, [inputValues, isSubmit]);

  const handleSexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChips(value);
    updateValidationError('sex', false);
  };
  useEffect(() => {
    if (data) {
      inputReset(data);
    }
  }, [data, inputReset]);

  return (
    <>
      <FormContentWrap>
        <TopTitleWrap>
          <h3>회원 정보 수정</h3>
          <p>회원 정보를 수정합니다.</p>
        </TopTitleWrap>
        <form method="post" onSubmit={handleSubmit}>
          <FormGridContainer>
            <div>
              <SC.Label>
                이름 <span></span>
              </SC.Label>
              <InputField
                className="required"
                disabled={isEditMode}
                error={validationErrors.name}
                name="name"
                placeholder="이름을 입력해 주세요."
                type="text"
                value={inputValues.name}
                onChange={onChange}
              />
            </div>

            <div>
              <SC.Label>
                성별<span></span>
              </SC.Label>
              <div className="button-wrap">
                <Chips>
                  <label className={chips === 'FEMALE' ? 'on' : ''} htmlFor="female">
                    여
                  </label>
                  <input id="female" name="sex" type="radio" value={'FEMALE'} onChange={handleSexChange} />
                  <label className={chips === 'MALE' ? 'on' : ''} htmlFor="male">
                    남
                  </label>
                  <input id="male" name="sex" type="radio" value={'MALE'} onChange={handleSexChange} />
                </Chips>
              </div>
            </div>

            <div>
              <SC.Label>
                생년월일 <span></span>
              </SC.Label>
              <SC.InputField
                className={!validationErrors.birthDate ? '' : 'error'}
                name="birthDate"
                type="date"
                value={inputValues.birthDate}
                onChange={onChange}
              />
            </div>

            <div>
              <SC.Label>
                휴대폰 번호 <span></span>
              </SC.Label>
              <InputField
                className="required"
                disabled={isEditMode}
                error={validationErrors.phone}
                isStartZero={false}
                maxLength={13}
                name="phone"
                placeholder="000-0000-0000"
                type="phone"
                value={inputValues.phone}
                onChange={onChange}
              />
              {validationErrors.phone && <ErrorMessage>올바른 형식의 핸드폰 번호를 입력해 주세요.</ErrorMessage>}
            </div>

            <div>
              <SC.Label>직업</SC.Label>
              <SC.Select name="job" value={inputValues.job} onChange={onChange}>
                <option className="opion-title" defaultValue="">
                  선택해주세요
                </option>
                <option value="사무직">사무직</option>
                <option value="현장직">현장직</option>
                <option value="학생">학생</option>
                <option value="가사노동자">가사노동자</option>
                <option value="무직">무직</option>
              </SC.Select>
            </div>

            <div>
              <SC.Label>방문경로</SC.Label>
              <SC.Select name="acquisitionFunnel" value={inputValues.acquisitionFunnel} onChange={onChange}>
                <option className="opion-title" defaultValue="">
                  선택해주세요
                </option>
                <option value="주변 추천">주변 추천</option>
                <option value="오프라인 광고 (배너, 현수막, 지하철 옥외광고)">
                  오프라인 광고 (배너, 현수막, 지하철 옥외광고)
                </option>
                <option value="SNS 광고 (페이스북, 인스타 광고)">SNS 광고 (페이스북, 인스타 광고)</option>
                <option value="기타 온라인 광고">기타 온라인 광고</option>
                <option value="네이버 지도">네이버 지도</option>
              </SC.Select>
            </div>
          </FormGridContainer>
          <FormButtonGroup>
            <Button isPri={false} size="full" onClick={() => navigate(-1)}>
              돌아가기
            </Button>
            <Button size="full" type="submit">
              완료
            </Button>
          </FormButtonGroup>
        </form>
      </FormContentWrap>
      {isOpen && (
        <Modal setIsOpen={() => setIsOpen(false)}>
          <h3>수정 완료</h3>
          <p>회원 정보 수정이 완료되었습니다.</p>
          <ModalButton
            onClick={() => {
              setIsOpen(false);
              navigate(-1);
            }}
          >
            닫기
          </ModalButton>{' '}
        </Modal>
      )}
    </>
  );
};

const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  font-size: ${theme.font.sm} !important;
  color: ${theme.colors.Error} !important;
`;

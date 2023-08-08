import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button } from '@components/common/Button';
import { InputField } from '@components/common/InputField';
import { Modal } from '@components/common/Modal';
import { useRequests } from '@hooks/apis/useRequests';
import useInput from '@hooks/utils/useInput';
import { useValidation, ValidationProps } from '@hooks/utils/useValidation';
import { ErrorMessage } from '@styles/common/errorMessageStyle';
import { Chips, FormButtonGroup, FormGridContainer } from '@styles/common/FormStyle';
import { SC } from '@styles/common/inputsStyles';
import { FormContentWrap, TopTitleWrap } from '@styles/common/wrapStyle';
import { MemberModalWrap, ModalButton } from '@styles/modal/modalStyle';

interface ErrorType {
  available: boolean;
  msg?: string;
}

interface MemberFormType {
  name: string;
  birthDate: number | string;
  phone: string;
  sex: string;
  job: string;
  acqusitionFunnel: string;
  acquisitionFunnel: string;
  toss: [];
}

export const memberForm: MemberFormType = {
  name: '',
  birthDate: '',
  phone: '',
  sex: '',
  job: '',
  acqusitionFunnel: '',
  acquisitionFunnel: '',
  toss: [],
};

const errorCheckInput: ValidationProps[] = [
  { name: 'name', type: 'string' },
  { name: 'birthDate', type: 'string' },
  { name: 'phone', type: 'phone' },
];

export const MembersForm = () => {
  const navigate = useNavigate();
  const { request } = useRequests();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValues, onChange, inputReset] = useInput({ ...memberForm });
  const { checkForErrors, updateValidationError, validationErrors, isSubmit } = useValidation();
  const [isOpen, setIsOpen] = useState(false);
  const [chips, setChips] = useState('FEMALE');
  const isEditMode = false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateFields();
    if (isValid) {
      try {
        await request({
          url: 'members',
          method: 'post',
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
    if (searchParams.size > 0) {
      const initName = searchParams.get('name');
      const initPhone = searchParams.get('phone');
      inputReset({
        ...inputValues,
        name: initName || '',
        phone: initPhone || '',
      });
    }
  }, [searchParams]);

  return (
    <>
      <MemberModalWrap>
        {isOpen && (
          <Modal setIsOpen={() => setIsOpen(false)}>
            <h3>등록완료</h3>
            <p>
              {inputValues.name}님의 회원 정보가 생성되었습니다. <br />
              문진을 바로 시작하시겠어요?
            </p>
            <img alt="" src="/imgs/Graphic_Member_registered.png" />
            <div className="buttonWrapper">
              <ModalButton
                $isPrimary={false}
                onClick={() => {
                  navigate('/members');
                }}
              >
                닫기
              </ModalButton>
              <ModalButton
                $isPrimary={true}
                onClick={() => {
                  navigate('/members');
                }}
              >
                문진 시작
              </ModalButton>
            </div>
          </Modal>
        )}
      </MemberModalWrap>

      <FormContentWrap>
        <TopTitleWrap>
          <h3>회원 등록</h3>
          <p>회원 정보를 등록합니다.</p>
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
              <SC.Select name="job" onChange={onChange}>
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
              <SC.Select name="acquisitionFunnel" onChange={onChange}>
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
    </>
  );
};

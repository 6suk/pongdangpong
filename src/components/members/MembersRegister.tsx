import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';
import styled from 'styled-components';

import { InputField } from '@components/center/ticket/Form/InputField';
import { Button } from '@components/common/Button';
import { Modal, ModalButton } from '@components/common/Modal';
import { useRequests } from '@hooks/apis/useRequests';
import useInput from '@hooks/utils/useInput';
import { FormButtonGroup, FormGridContainer } from '@styles/center/ticketFormStyle';
import { Chips, FormContentWrap, SC, TopTitleWrap } from '@styles/styles';
import theme from '@styles/theme';

interface MemberFormErrorType {
  [key: string]: ErrorType;
}

interface ErrorType {
  available: boolean;
  msg?: string;
}

const initError = {
  name: { available: true, msg: '' },
  birthDate: { available: true, msg: '' },
  phone: { available: true, msg: '' },
  sex: { available: true, msg: '' },
  job: { available: true, msg: '' },
  acqusitionFunnel: { available: true, msg: '' },
  acquisitionFunnel: { available: true, msg: '' },
  toss: { available: true, msg: '' },
};

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

export const MembersResgier = () => {
  const navigate = useNavigate();
  const { request, isLoading } = useRequests();
  const [inputValues, onChange] = useInput({ ...memberForm });
  const [validationErrors, setValidationErrors] = useState<MemberFormErrorType>(initError);
  const [isOpen, setIsOpen] = useState(false);
  const [chips, setChips] = useState('FEMAIL');
  const isEditMode = false;
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegisteredModalOpen, setIsRegisteredModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validateFields();
    console.log('유효성 검사 결과:', isValid);

    if (isRegistered) {
      setIsRegisteredModalOpen(true);
      return;
    }
    if (isValid && !isRegistered) {
      try {
        const response = await request({
          url: 'members',
          method: 'post',
          body: { ...inputValues, sex: chips },
        });
        console.log('등록 완료');
        setIsRegistered(true);
        setIsOpen(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validateFields = async () => {
    const errors: MemberFormErrorType = { ...validationErrors };
    console.log('에러 내용:', errors);

    if (inputValues.name === '') {
      errors.name = { available: false, msg: '이름을 입력해 주세요.' };
    } else {
      errors.name = { available: true, msg: '' };
    }

    if (inputValues.sex === '') {
      errors.sex = { available: false, msg: '성별을 선택해 주세요.' };
    } else {
      errors.sex = { available: true, msg: '' };
    }

    if (inputValues.birthDate === '') {
      errors.birthDate = { available: false, msg: '생년월일을 입력해 주세요.' };
    } else {
      errors.birthDate = { available: true, msg: '' };
    }

    validatePhone();
    setValidationErrors(errors);
    return Object.values(errors).every(error => error.available);
  };

  const validateServer = async (phone: string, minLength: number, errorMsg: string, apiUrl: string) => {
    const errors: MemberFormErrorType = { ...validationErrors };

    if (phone.length < minLength) {
      errors.phone.available = false;
      errors.phone.msg = errorMsg;
    } else {
      try {
        const response = await request({
          url: apiUrl,
          method: 'post',
          body: {
            phone: phone,
          },
        });
        const msg = response.data.available ? '' : `이미 존재하는 핸드폰 번호입니다.`;
        errors.phone.available = response.data.available;
        errors.phone.msg = msg;
      } catch (error) {
        console.error(error);
        errors.phone.available = false;
        errors.phone.msg = `핸드폰 번호 검증에 실패했습니다.`;
      }
    }

    setValidationErrors(errors);
  };

  const validatePhone = () => {
    validateServer(inputValues.phone, 12, '올바른 형식의 핸드폰 번호를 입력해 주세요.', 'staffs/validate/phone');
  };

  useEffect(() => {
    const { phone } = inputValues;
    if (phone.length > 0) {
      validatePhone();
    }
  }, [inputValues]);

  const handleSexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChips(value);
    onChange(e);
    console.log('성별 유효성 상태:', validationErrors.sex.available);
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      sex: { available: true, msg: '' },
    }));
  };

  return (
    <>
      <S.modalContainer>
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
                  setIsOpen(false);
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
      </S.modalContainer>

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
                error={!validationErrors.name.available}
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
                  <label
                    className={chips === 'FEMALE' ? 'on' : validationErrors.sex.available ? '' : 'error'}
                    htmlFor="female"
                  >
                    {' '}
                    여
                  </label>
                  <input id="female" name="sex" type="radio" value={'FEMALE'} onChange={handleSexChange} />
                  <label
                    className={chips === 'MALE' ? 'on' : validationErrors.sex.available ? '' : 'error'}
                    htmlFor="male"
                  >
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
                className={validationErrors.birthDate.available ? '' : 'error'}
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
                error={!validationErrors.phone.available}
                isStartZero={false}
                maxLength={13}
                name="phone"
                placeholder="000-0000-0000"
                type="phone"
                value={inputValues.phone}
                onChange={onChange}
              />
              {!validationErrors.phone.available && <ErrorMessage>{validationErrors.phone.msg}</ErrorMessage>}{' '}
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
              <SC.Select name="visitRoute" onChange={onChange}>
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
      {isRegisteredModalOpen && (
        <Modal setIsOpen={setIsRegisteredModalOpen}>
          <p>이미 회원 등록이 완료되었습니다.</p>
          <ModalButton
            $isPrimary={false}
            onClick={() => {
              navigate('/members');
            }}
          >
            닫기
          </ModalButton>
        </Modal>
      )}
    </>
  );
};

const S = {
  modalContainer: styled.div`
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,

  MembersEditContainer: styled.div`
    width: 780px;
    h2 {
      text-align: center;
      font-weight: 600;
      font-size: ${({ theme: { font } }) => font['main']};
    }
    p {
      margin-bottom: 62px;
      text-align: center;
    }
  `,
  wrap: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    span {
      color: ${({ theme: { colors } }) => colors['Pri-400']};
    }

    .first-column {
      width: 50%;
      margin-right: 40px;
      input {
        margin-bottom: 26px;
      }

      .button-wrap {
        margin-bottom: 30px;

        &.error button[type='button'] {
          border: 1px solid ${({ theme }) => theme.colors.Error}; /* 에러 색상을 설정합니다 */
        }

        &.error input[type='radio'] {
          border: 1px solid ${({ theme }) => theme.colors.Error}; /* 라디오 버튼의 에러 색상을 설정합니다 */
        }

        button[type='button'] {
          width: 70px;
          height: 36px;
          border: 1px solid #cfcfcf;
          border-radius: 4px;
          margin-right: 6px;

          &.on {
            border: none;
            background-color: ${({ theme: { colors } }) => colors['Pri-400']};
            color: #fff;
          }
        }
      }
    }
    .second-column {
      width: 50%;

      select {
        margin-bottom: 26px;
      }
    }
  `,

  BtnWrap: styled.div`
    display: flex;

    & > button:nth-of-type(1) {
      margin-right: 40px;
    }
  `,
};

const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  font-size: ${theme.font.sm} !important;
  color: ${theme.colors.Error} !important;
`;

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

import { Roles, staff_form } from '@apis/staffsAPIs';
import { InputField } from '@components/center/ticket/form/InputField';
import { Button } from '@components/common/Button';
import { useRequests } from '@hooks/apis/useRequests';
import { useSwrData } from '@hooks/apis/useSwrData';
import useCheckbox from '@hooks/utils/useCheckbox';
import useInput from '@hooks/utils/useInput';
import { FormButtonGroup } from '@styles/center/ticketFormStyle';
import { FormContentWrap, TopTitleWrap } from '@styles/styles';

import theme from '@styles/theme';

interface StaffFormErrorType {
  [key: string]: ErrorType;
}

interface ErrorType {
  available: boolean;
  msg?: string;
}

const initError = {
  phone: {
    available: true,
    msg: '',
  },
  id: {
    available: true,
    msg: '',
  },
  name: { available: true, msg: '' },
  password: { available: true, msg: '' },
  roles: { available: true, msg: '' },
};

export const StaffsForm = () => {
  const isEditMode = false;
  const navigate = useNavigate();
  const [inputValues, onChange] = useInput({ ...staff_form });
  const [checkedValues, onCheckboxChange] = useCheckbox(['1']);
  const { request, isLoading } = useRequests();
  const { data: { roles } = { roles: [] }, isLoading: rolesIsLoading } = useSwrData('roles');
  const [validationErrors, setValidationErrors] = useState<StaffFormErrorType>(initError);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateFields();

    if (isValid) {
      const requestData = { ...inputValues, roles: checkedValues };
      console.log(requestData);
      try {
        const response = await request({ url: 'staffs', method: 'post', body: requestData });
        const {
          data: { loginId, name },
        } = response;
        if (!isLoading) navigate(`completion/${loginId}/${name}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 에러 체크 및 유효성 검사
  const validateFields = async () => {
    const errors: StaffFormErrorType = { ...validationErrors };

    // submit 시 나머지 필드들 검사
    // name 검사
    if (inputValues.name === '') {
      errors.name.available = false;
      errors.name.msg = '이름을 입력해 주세요.';
    } else {
      errors.name.available = true;
      errors.name.msg = '';
    }

    // password 검사
    if (inputValues.password === '') {
      errors.password.available = false;
      errors.password.msg = '비밀번호를 입력해 주세요.';
    } else {
      errors.password.available = true;
      errors.password.msg = '';
    }

    setValidationErrors(errors);
    validateLoginId();
    validatePhone();

    return Object.values(errors).every(error => error.available);
  };

  const validateServer = async (
    fieldName: 'loginId' | 'phone',
    minLength: number,
    errorMsg: string,
    apiUrl: string,
    bodyId?: string
  ) => {
    const errors: StaffFormErrorType = { ...validationErrors };
    const id = bodyId ? bodyId : fieldName;
    const errorName = fieldName === 'loginId' ? '아이디' : '핸드폰 번호';
    if (inputValues[fieldName].length < minLength) {
      errors[id].available = false;
      errors[id].msg = errorMsg;
    } else {
      try {
        const response = await request({
          url: apiUrl,
          method: 'post',
          body: {
            // [id]: inputValues[fieldName].replace(/-/g, ''),
            [id]: inputValues[fieldName],
          },
        });
        const msg = response.data.available ? '' : `이미 존재하는 ${errorName}입니다.`;
        errors[id].available = response.data.available;
        errors[id].msg = msg;
      } catch (error) {
        console.error(error);
        errors[id].available = false;
        errors[id].msg = `${fieldName} 검증에 실패했습니다.`;
      }
    }

    setValidationErrors(errors);
  };

  const validatePhone = () => {
    validateServer('phone', 12, '올바른 형식의 핸드폰 번호를 입력해 주세요.', 'staffs/validate/phone');
  };

  const validateLoginId = () => {
    validateServer(
      'loginId',
      3,
      '3~15자의 영문 소문자, 숫자를 사용한 아이디를 입력해 주세요.',
      'staffs/validate/id',
      'id'
    );
  };

  useEffect(() => {
    const { loginId, name, phone, password } = inputValues;
    const { name: nameError, password: pwsError } = validationErrors;

    if (loginId.length > 0) validateLoginId();
    if (phone.length > 0) validatePhone();
    if (!nameError.available && name.length > 0) validateFields();
    if (!pwsError.available && password.length > 0) validateFields();
  }, [inputValues]);

  return (
    <FormContentWrap>
      <TopTitleWrap>
        <h3>{'직원 정보 입력'}</h3>
        <p>{'직원을 등록하고 역할을 부여해주세요.'}</p>
      </TopTitleWrap>
      <form method="post" onSubmit={handleSubmit}>
        <RoleFlexContainer>
          <RoleGridContainer>
            <div>
              <InputField
                className="required"
                disabled={isEditMode}
                error={!validationErrors.name.available}
                label="이름"
                name="name"
                placeholder="이름"
                type="text"
                value={inputValues.name}
                onChange={onChange}
              />
            </div>
            <div>
              <InputField
                className="required"
                disabled={isEditMode}
                error={!validationErrors.phone.available}
                isStartZero={false}
                label="휴대폰 번호"
                maxLength={13}
                name="phone"
                placeholder="000-0000-0000"
                type="phone"
                value={inputValues.phone}
                onChange={onChange}
              />
              {!validationErrors.phone.available && <ErrorMessage>{validationErrors.phone.msg}</ErrorMessage>}
            </div>
            <div>
              <InputField
                className="required"
                disabled={isEditMode}
                error={!validationErrors.id.available}
                isStartZero={false}
                label="아이디"
                maxLength={15}
                name="loginId"
                pattern="[^A-Za-z0-9]"
                placeholder="아이디"
                type="text"
                value={inputValues.loginId}
                onChange={onChange}
              />
              {!validationErrors.id.available && <ErrorMessage>{validationErrors.id.msg}</ErrorMessage>}
            </div>
            <div>
              <InputField
                className="required"
                disabled={isEditMode}
                error={!validationErrors.password.available}
                isStartZero={false}
                label="임시 비밀번호(PIN)"
                maxLength={6}
                name="password"
                pattern="[^0-9]"
                placeholder="4~6자 PIN번호"
                type="password"
                value={inputValues.password}
                onChange={onChange}
              />
            </div>
          </RoleGridContainer>
          <RolesWrap>
            {/* <h3 className="roles-title">역할 선택 (중복선택 가능)</h3> */}
            <p className="roles-title">역할 선택 (중복선택 가능)</p>
            <p className="roles-desc">센터에서 설정한 역할을 등록하려는 직원에게 부여합니다.</p>
            <div className={`checkBox-wrap ${checkedValues.length < 1 && 'error'}`}>
              {!rolesIsLoading &&
                roles.map((v: Roles) => {
                  const { id, name, description } = v;
                  return (
                    <div key={id}>
                      <input
                        checked={checkedValues.includes(id.toString())}
                        id={name}
                        name="roles"
                        type="checkbox"
                        value={id}
                        onChange={onCheckboxChange}
                      />
                      <label className="checkbox-label" htmlFor={name}>
                        <p>{name}</p>
                        <p>{description}</p>
                      </label>
                    </div>
                  );
                })}
            </div>
            {checkedValues.length < 1 && <ErrorMessage>역할을 1개 이상 선택해 주세요.</ErrorMessage>}
          </RolesWrap>
        </RoleFlexContainer>
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
  );
};

const RoleFlexContainer = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 2rem;
`;

const RoleGridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, minmax(104px, 1fr));
  grid-auto-flow: row;
  row-gap: 0.5rem;
  column-gap: 3rem;
  width: 100%;

  .row-input {
    display: flex;
    gap: 0.5rem;

    :first-child {
      flex: 7;
    }
    :last-child {
      flex: 3;
    }
  }
`;

const RolesWrap = styled.div`
  width: 100%;

  h3.roles-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p.roles-title {
    display: block;
    /* margin-bottom: 0.5rem; */
    font-size: 0.875rem;
    font-weight: 600;
    color: #4b5563;
  }

  .roles-title::after {
    content: '*';
    color: #4679fc;
    margin-left: 0.1rem;
  }

  .roles-desc {
    font-size: 14px;
    color: ${theme.colors.gray[400]};
    margin-bottom: 1rem;
  }

  .checkBox-wrap {
    &.error {
      border: 1px solid rgba(223, 41, 29, 0.7);
      transition: all 0.3s;
      border-radius: 6px;
    }

    display: flex;
    flex-direction: column;
    gap: 1rem;

    input[type='checkbox'] {
      display: none;
    }
    input[type='checkbox']:checked + label {
      background-color: ${theme.colors.pri[900]};
      border: 1.5px solid ${theme.colors.pri[500]};
    }

    label {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      border: 1px solid ${theme.colors.gray[600]};
      border-radius: 6px;
      transition: all 0.4s;

      & :first-child {
        font-weight: 600;
        font-size: 16px;
      }
      & :last-child {
        font-size: 14px;
      }
    }
  }
`;

const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  font-size: ${theme.font.sm} !important;
  color: ${theme.colors.Error} !important;
`;

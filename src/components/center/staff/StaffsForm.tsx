import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { RolesRoleType, RolesResponse, StaffFormInit } from '@apis/types/staffsTypes';
import { Button } from '@components/common/Button';
import { InputField } from '@components/common/InputField';
import { useRequests } from '@hooks/apis/useRequests';
import { useSwrData } from '@hooks/apis/useSwrData';
import useCheckbox from '@hooks/utils/useCheckbox';
import useInput from '@hooks/utils/useInput';

import { ErrorMessage } from '@styles/common/errorMessageStyle';
import { FormButtonGroup } from '@styles/common/FormStyle';
import { FormContentWrap, TopTitleWrap } from '@styles/common/wrapStyle';
import { RoleFlexContainer, RoleGridContainer, RolesWrap } from '@styles/pages/staffFormStyle';

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
  const [inputValues, onChange] = useInput({ ...StaffFormInit });
  const [checkedValues, onCheckboxChange] = useCheckbox(['1']);
  const { request, isLoading } = useRequests();
  const { data: { roles } = { roles: [] }, isLoading: rolesIsLoading } = useSwrData<RolesResponse>('roles');
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
            <p className="roles-title">역할 선택 (중복선택 가능)</p>
            <p className="roles-desc">센터에서 설정한 역할을 등록하려는 직원에게 부여합니다.</p>
            <div className={`checkBox-wrap ${checkedValues.length < 1 && 'error'}`}>
              {!rolesIsLoading &&
                roles.map((v: RolesRoleType) => {
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

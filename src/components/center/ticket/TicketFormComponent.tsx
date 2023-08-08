import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { LessonTypeEnum, TermUnitEnum, Ticket_put_body, Tickets_request, tickets_create } from '@apis/ticketsAPIs';
import { Button } from '@components/common/Button';
import { InputField } from '@components/common/InputField';
import { SelectField } from '@components/common/SelectField';
import useInput from '@hooks/utils/useInput';
import { ValidationProps, useValidation } from '@hooks/utils/useValidation';

import {
  FormButtonGroup,
  FormGridContainer,
  FormToggleWrap,
  InputCountStyle,
  LabelNotice,
  Unit,
} from '@styles/common/FormStyle';
import { SC } from '@styles/common/inputsStyles';
import { FormContentWrap, TopTitleWrap } from '@styles/common/wrapStyle';

export type TicketFormDataType = Tickets_request | Ticket_put_body;

export interface TicketFormProps {
  initialData?: Tickets_request;
  onSubmit: (data: TicketFormDataType) => Promise<void> | void;
  isEditMode?: boolean;
}

export interface ValidationErrors {
  [key: string]: boolean;
}

const errorCheckInput: ValidationProps[] = [
  { name: 'title', type: 'string' },
  { name: 'defaultTerm', type: 'number' },
  { name: 'defaultCount', type: 'number' },
  { name: 'duration', type: 'number' },
];

const errorCheckEditInput: ValidationProps[] = [
  { name: 'defaultTerm', type: 'number' },
  { name: 'defaultCount', type: 'number' },
];

export const TicketFormComponent: React.FC<TicketFormProps> = ({
  initialData = tickets_create.body,
  onSubmit,
  isEditMode = false,
}) => {
  const navigate = useNavigate();
  const [inputValues, onChange, inputReset] = useInput({ ...initialData });
  const [count, setCount] = useState(initialData.maxServiceCount || 0);
  const [toggles, setToggles] = useState<{ [key: string]: boolean }>({ termToggle: true, countToggle: true });
  const { checkForErrors, updateValidationError, validationErrors } = useValidation();
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    const isValid = checkForErrorAddToggle();

    if (isValid) {
      // 소진시까지, 무제한 클릭 시
      let valuesCopy;

      if (isEditMode) {
        valuesCopy = {
          defaultCount: inputValues.defaultCount,
          defaultTerm: inputValues.defaultTerm,
          defaultTermUnit: inputValues.defaultTermUnit,
          maxServiceCount: count,
        } as Ticket_put_body;
      } else {
        valuesCopy = { ...inputValues, maxServiceCount: count } as Tickets_request;
      }

      const { termToggle, countToggle } = toggles;
      if (termToggle) {
        delete valuesCopy.defaultTerm;
        delete valuesCopy.defaultTermUnit;
      } else if (countToggle) {
        delete valuesCopy.defaultCount;
        delete valuesCopy.maxServiceCount;
      }
      // 서버 전송
      onSubmit(valuesCopy);
    }
  };

  // 유효성 검사
  const checkForErrorAddToggle = () => {
    const errorArr = isEditMode ? errorCheckEditInput : errorCheckInput;

    if (toggles.countToggle) {
      const filteredInput = errorArr.filter(item => item.name !== 'defaultCount');
      return checkForErrors(filteredInput, inputValues);
    }
    if (toggles.termToggle) {
      const filteredInput = errorArr.filter(item => item.name !== 'defaultTerm');
      return checkForErrors(filteredInput, inputValues);
    }

    return checkForErrors(errorArr, inputValues);
  };

  const toggleHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;

    setToggles(prev => ({
      ...prev,
      termToggle: name === 'termToggle' ? !prev.termToggle : false,
      countToggle: name === 'countToggle' ? !prev.countToggle : false,
    }));

    const inputName = name === 'termToggle' ? 'defaultTerm' : 'defaultCount';
    updateValidationError(inputName, toggles[name]);
  };

  useEffect(() => {
    inputReset(initialData);
    setToggles({
      termToggle: isEditMode ? !initialData.defaultTerm : false,
      countToggle: isEditMode ? !initialData.defaultCount : false,
    });
    setCount(initialData.maxServiceCount || 0);
  }, [initialData, inputReset, setToggles, isEditMode]);

  useEffect(() => {
    if (isSubmit) checkForErrorAddToggle();
  }, [inputValues, isSubmit]);

  return (
    <>
      <FormContentWrap>
        <TopTitleWrap>
          <h3>{isEditMode ? '수강권 정보 설정' : '수강권 생성'}</h3>
          <p>{isEditMode ? '센터의 수강권을 수정하세요' : '센터의 수강권을 생성하세요'}</p>
        </TopTitleWrap>
        <form method="post" onSubmit={handleSubmit}>
          <FormGridContainer>
            <div>
              <SelectField
                className="required"
                disabled={isEditMode}
                label="수업 유형"
                name="lessonType"
                options={[{ value: 'SINGLE', label: LessonTypeEnum['SINGLE'] }]}
                value={inputValues.lessonType}
                onChange={onChange}
              />
            </div>
            <div>
              <InputField
                className="required"
                disabled={isEditMode}
                error={validationErrors.title}
                label="수강권명"
                name="title"
                placeholder="수강권명"
                type="text"
                value={inputValues.title}
                onChange={onChange}
              />
            </div>
            <div>
              <SC.Label className="required" htmlFor="defaultTerm">
                수강권 기간
              </SC.Label>
              <div className="row-input">
                <InputField
                  disabled={toggles.termToggle}
                  error={validationErrors.defaultTerm}
                  name="defaultTerm"
                  placeholder="0"
                  type="text"
                  value={inputValues.defaultTerm}
                  onChange={onChange}
                />
                <SelectField
                  disabled={toggles.termToggle}
                  name="defaultTermUnit"
                  value={inputValues.defaultTermUnit || 'DAY'}
                  options={[
                    { value: 'DAY', label: TermUnitEnum['DAY'] },
                    { value: 'WEEK', label: TermUnitEnum['WEEK'] },
                    { value: 'MONTH', label: TermUnitEnum['MONTH'] },
                    { value: 'YEAR', label: TermUnitEnum['YEAR'] },
                  ]}
                  onChange={onChange}
                />
              </div>
              <FormToggleWrap>
                <p>소진시까지</p>
                <button className="toggle-box" name="termToggle" type="button" onClick={toggleHandler}>
                  <div className={`toggle-container ${toggles.termToggle ? 'toggle--checked' : null}`} />
                  <div className={`toggle-circle ${toggles.termToggle ? 'toggle--checked' : null}`} />
                </button>
              </FormToggleWrap>
            </div>
            <div>
              <InputField
                className="required"
                disabled={isEditMode}
                error={validationErrors.duration}
                label="시간"
                name="duration"
                placeholder="0"
                type="text"
                unit="분"
                value={inputValues.duration}
                onChange={onChange}
              />
            </div>
            <div>
              <InputField
                className="required"
                disabled={toggles.countToggle}
                error={validationErrors.defaultCount}
                label="기본횟수"
                name="defaultCount"
                placeholder="0"
                type="text"
                unit="회"
                value={inputValues.defaultCount}
                onChange={onChange}
              />
              <FormToggleWrap>
                <p>무제한</p>
                <button className="toggle-box" name="countToggle" type="button" onClick={toggleHandler}>
                  <div className={`toggle-container ${toggles.countToggle ? 'toggle--checked' : null}`} />
                  <div className={`toggle-circle ${toggles.countToggle ? 'toggle--checked' : null}`} />
                </button>
              </FormToggleWrap>
            </div>
            <div>
              <SC.Label htmlFor="maxServiceCount">
                서비스 횟수<LabelNotice>서비스로 부여되는 횟수를 제한하여 설정할 수 있습니다.</LabelNotice>
              </SC.Label>
              <InputCountStyle>
                <button
                  type="button"
                  onClick={() => {
                    if (count > 0 && !toggles.countToggle) setCount(prev => prev - 1);
                  }}
                >
                  -
                </button>
                <Unit>
                  <SC.InputField
                    readOnly
                    disabled={toggles.countToggle}
                    id="maxServiceCount"
                    name="maxServiceCount"
                    style={{ textAlign: 'center' }}
                    value={count + ' 회'}
                  />
                </Unit>
                <button
                  type="button"
                  onClick={() => {
                    if (!toggles.countToggle) setCount(prev => prev + 1);
                  }}
                >
                  +
                </button>
              </InputCountStyle>
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

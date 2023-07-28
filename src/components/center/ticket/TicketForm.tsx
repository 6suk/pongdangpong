import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

import { LessonTypeEnum, TermUnitEnum, tickets_create } from '@apis/ticketsAPIs';
import { Button } from '@components/common/Button';
import { useRequests } from '@hooks/apis/useRequests';
import useInput from '@hooks/utils/useInput';
import { FormContentWrap, SC, TopTitleWrap } from '@styles/styles';
import theme from '@styles/theme';

import { InputField, Unit } from './Form/InputField';
import { SelectField } from './Form/SelectField';

interface ValidationErrors {
  [key: string]: boolean;
}

export const TicketForm = () => {
  const navigate = useNavigate();
  const { request } = useRequests();
  const [inputValues, onChange, inputReset] = useInput({ ...tickets_create.body });
  const [count, setCount] = useState(0);
  const [toggles, setToggles] = useState<{ [key: string]: boolean }>({
    termToggle: false,
    countToggle: false,
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const toggleHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;

    setToggles(prev => ({
      ...prev,
      termToggle: name === 'termToggle' ? !prev.termToggle : false,
      countToggle: name === 'countToggle' ? !prev.countToggle : false,
    }));
  };

  // 에러 체크
  const checkForErrors = () => {
    const errors: ValidationErrors = {};
    if (inputValues.title === '') errors['title'] = true;
    if (!toggles.termToggle && inputValues.defaultTerm === 0) errors['defaultTerm'] = true;
    if (inputValues.duration === 0) errors['duration'] = true;
    if (!toggles.countToggle && inputValues.defaultCount === 0) errors['defaultCount'] = true;

    return errors;
  };

  // 에러 상태 업데이트
  const validateInputs = () => {
    const errors = checkForErrors();
    setValidationErrors(errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateInputs();
    const errors = checkForErrors();
    const isError = Object.keys(errors).length !== 0;

    if (!isError) {
      const { url, method } = tickets_create;
      try {
        await request({
          url,
          method,
          body: inputValues,
        });
        navigate('/center/tickets');
        inputReset();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <FormContentWrap>
        <TopTitleWrap>
          <h3>수강권 생성</h3>
          <p>센터의 수강권을 생성하세요</p>
        </TopTitleWrap>
        <form method="post" onSubmit={handleSubmit}>
          <GridContainer>
            <div>
              <SelectField
                label="수업 유형"
                name="lessonType"
                options={[{ value: 'SINGLE', label: LessonTypeEnum['SINGLE'] }]}
                value={inputValues.lessonType}
                onChange={onChange}
              />
            </div>
            <div>
              <InputField
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
                  value={inputValues.defaultTermUnit}
                  options={[
                    { value: 'DAY', label: TermUnitEnum['DAY'] },
                    { value: 'WEEK', label: TermUnitEnum['WEEK'] },
                    { value: 'MONTH', label: TermUnitEnum['MONTH'] },
                    { value: 'YEAR', label: TermUnitEnum['YEAR'] },
                  ]}
                  onChange={onChange}
                />
              </div>
              <ToggleWrap>
                <p>소진시까지</p>
                <button className="toggle-box" name="termToggle" type="button" onClick={toggleHandler}>
                  <div className={`toggle-container ${toggles.termToggle ? 'toggle--checked' : null}`} />
                  <div className={`toggle-circle ${toggles.termToggle ? 'toggle--checked' : null}`} />
                </button>
              </ToggleWrap>
            </div>
            <div>
              <InputField
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
              <ToggleWrap>
                <p>무제한</p>
                <button className="toggle-box" name="countToggle" type="button" onClick={toggleHandler}>
                  <div className={`toggle-container ${toggles.countToggle ? 'toggle--checked' : null}`} />
                  <div className={`toggle-circle ${toggles.countToggle ? 'toggle--checked' : null}`} />
                </button>
              </ToggleWrap>
            </div>
            <div>
              <SC.Label htmlFor="maxServiceCount">
                서비스 횟수<Notice>서비스로 부여되는 횟수를 제한하여 설정할 수 있습니다.</Notice>
              </SC.Label>
              <CountStyle>
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
                    onChange={onChange}
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
              </CountStyle>
            </div>
          </GridContainer>
          <ButtonGroup>
            <Button isPri={false} size="full">
              돌아가기
            </Button>
            <Button size="full" type="submit">
              완료
            </Button>
          </ButtonGroup>
        </form>
      </FormContentWrap>
    </>
  );
};

const ToggleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  justify-content: flex-end;

  & > p {
    font-size: ${theme.font.sub};
    color: ${theme.colors.gray[500]};
  }

  .toggle-box {
    position: relative;
    cursor: pointer;

    & > .toggle-container {
      width: 42px;
      height: 24px;
      border-radius: 30px;
      background-color: ${theme.colors.gray[800]};
    }
    & > .toggle--checked {
      background-color: ${theme.colors.pri[600]};
      transition: 0.5s;
    }

    & > .toggle-circle {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: rgb(255, 254, 255);
      transition: 0.5s;
    }
    & > .toggle--checked {
      left: 22px;
      transition: 0.5s;
    }
  }
`;

const Notice = styled.span`
  font-size: ${theme.font.sm};
  color: ${theme.colors.gray[500]};
  margin-left: 0.5rem;
  font-weight: 300;
`;

const CountStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr 1fr;
  align-items: center;
  gap: 0.5rem;

  button {
    font-size: 24px;
    color: ${theme.colors.gray[200]};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.gray[800]};
    border-radius: 50%;
    box-sizing: border-box;
    padding: 0;
    aspect-ratio: 1 / 1;
    height: 38px;
    transition: all 0.4s;

    &:hover {
      background-color: ${theme.colors.gray[700]};
    }
  }

  .unit {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }
`;

const GridContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  grid-auto-flow: column;
  row-gap: 0.5rem;
  column-gap: 3rem;

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

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 3rem;
`;

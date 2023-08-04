import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CounselingInitInput, CounselingRequest } from '@apis/schedulesAPIs';
import { InputField } from '@components/center/ticket/form/InputField';
import { Button } from '@components/common/Button';
import { MemberOrUserSearchButton } from '@components/common/FindUserButton';
import { NoticeModal } from '@components/common/NoticeModal';
import { useRequests } from '@hooks/apis/useRequests';
import { useErrorModal } from '@hooks/utils/useErrorModal';
import useInput from '@hooks/utils/useInput';
import { ValidationProps, useValidation } from '@hooks/utils/useValidation';
import { clearAll } from '@stores/findUsersSlice';
import { setSelectedDate } from '@stores/selectedDateSlice';
import { RootState } from '@stores/store';
import { FormButtonGroup, FormGridContainer } from '@styles/center/ticketFormStyle';
import { FormContentWrap, SC, TopTitleWrap } from '@styles/styles';

const errorCheckInput: ValidationProps[] = [
  { name: 'USER', type: 'number' },
  { name: 'clientName', type: 'string' },
  { name: 'clientPhone', type: 'string' },
  { name: 'date', type: 'string' },
  { name: 'startTime', type: 'string' },
  { name: 'endTime', type: 'string' },
];

export const CounselingForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request } = useRequests();
  const { validationErrors, checkForErrors, updateValidationError } = useValidation();
  const { isErrorModalOpen, errorModal, handleAxiosError, closeErrorModal } = useErrorModal();
  const [inputValues, onChange] = useInput(CounselingInitInput);
  const USER = useSelector((state: RootState) => state.findUsers.USER);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(clearAll());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);
    const isValid = checkForErrorAddId();

    if (isValid) {
      const { date, startTime, endTime } = inputValues;
      if (USER.id !== undefined) {
        const requestValues: CounselingRequest = {
          clientName: inputValues.clientName,
          clientPhone: inputValues.clientPhone,
          memo: inputValues.memo,
          memberId: 0,
          userId: USER.id,
          startAt: `${date}T${startTime}:00.000Z`,
          endAt: `${date}T${endTime}:00.000Z`,
        };
        requestServer(requestValues);
        dispatch(setSelectedDate(date));
      }
    }
  };

  const requestServer = async (requestData: CounselingRequest) => {
    try {
      await request({
        url: 'schedules/counseling',
        method: 'post',
        body: requestData,
      });
      dispatch(clearAll());
      navigate('/schedules');
    } catch (error) {
      handleAxiosError(error, '상담 등록 오류');
    }
  };

  // 유효성 검사
  const checkForErrorAddId = () => {
    return checkForErrors(errorCheckInput, {
      ...inputValues,
      USER: USER.id,
    });
  };

  useEffect(() => {
    if (isSubmit) checkForErrorAddId();
    if (USER.id) updateValidationError('USER', false);
  }, [inputValues, USER]);

  return (
    <>
      <FormContentWrap>
        <TopTitleWrap>
          <h3>상담 일정 생성</h3>
          <p>상담 일정을 생성합니다.</p>
        </TopTitleWrap>
        <FormGridContainer>
          <div>
            {/* 강사선택 */}
            <MemberOrUserSearchButton error={validationErrors.USER} type="USER" />
          </div>

          <div>
            <SC.Label>
              일자 선택 <span></span>
            </SC.Label>
            <SC.InputField
              className={validationErrors.date ? 'error' : ''}
              name="date"
              type="date"
              onChange={onChange}
            />
          </div>
          <div>
            <SC.Label>
              시간 선택 <span></span>
            </SC.Label>
            <div className="time-inputs">
              <SC.InputField
                className={validationErrors.startTime ? 'error' : ''}
                name="startTime"
                type="time"
                value={inputValues.startTime}
                onChange={onChange}
              />
              ~
              <SC.InputField
                className={validationErrors.endTime ? 'error' : ''}
                name="endTime"
                type="time"
                value={inputValues.endTime}
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <SC.Label>
              이름 <span></span>
            </SC.Label>
            <SC.InputField
              className={validationErrors.clientName ? 'error' : ''}
              name="clientName"
              placeholder="이름"
              type="text"
              value={inputValues.clientName}
              onChange={onChange}
            />
          </div>
          <div>
            <SC.Label>
              연락처 <span></span>
            </SC.Label>
            <InputField
              error={validationErrors.clientPhone}
              isStartZero={false}
              name="clientPhone"
              placeholder="연락처"
              type="text"
              value={inputValues.clientPhone}
              onChange={onChange}
            />
          </div>
          <div>
            <SC.Label>일정 메모</SC.Label>
            <SC.InputField
              maxLength={500}
              name="memo"
              placeholder="내용을 입력해주세요. (500자 이내)"
              type="text"
              value={inputValues.memo}
              onChange={onChange}
            />
          </div>
        </FormGridContainer>
        <FormButtonGroup>
          <Button isPri={false} size="full" onClick={() => navigate(-1)}>
            돌아가기
          </Button>
          <Button disabled={false} size="full" type="submit" onClick={handleSubmit}>
            완료
          </Button>
        </FormButtonGroup>
      </FormContentWrap>

      {/* 에러 모달 */}
      {isErrorModalOpen && <NoticeModal innerNotice={errorModal} setIsOpen={closeErrorModal} />}
    </>
  );
};

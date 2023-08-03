import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AxiosError } from 'axios';

import { PrivateLessonInitInput, PrivatelessonRequest } from '@apis/schedulesAPIs';
import { Button } from '@components/common/Button';
import { NoticeModal } from '@components/common/NoticeModal';
import { useRequests } from '@hooks/apis/useRequests';
import useInput from '@hooks/utils/useInput';
import { ValidationProps, useValidation } from '@hooks/utils/useValidation';
import { clearAll } from '@stores/findUsersSlice';
import { setSelectedDate } from '@stores/selectedDateSlice';
import { RootState } from '@stores/store';
import { FormButtonGroup, FormGridContainer } from '@styles/center/ticketFormStyle';
import { FormContentWrap, SC, TopTitleWrap } from '@styles/styles';

import { handleModalNotice } from '@utils/handleModalNotice';

import { BookableTicketsList } from './BookableTicketsList';
import { MemberOrUserSearchButton } from '../common/FindUserButton';

export interface ErrorResponse {
  message: string;
}

const errorCheckInput: ValidationProps[] = [
  { name: 'MEMBER', type: 'number' },
  { name: 'USER', type: 'number' },
  { name: 'issuedTicketId', type: 'number' },
  { name: 'date', type: 'string' },
  { name: 'startTime', type: 'string' },
  { name: 'endTime', type: 'string' },
];

export const PrivateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request } = useRequests();
  const [isSubmit, setIsSubmit] = useState(false);
  const [inputValues, onChange, inputReset] = useInput(PrivateLessonInitInput);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorModal, serErrorModal] = useState({ title: '', content: '' });
  const { validationErrors, checkForErrors, updateValidationError } = useValidation();
  const { USER, MEMBER } = useSelector((state: RootState) => state.findUsers);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmit(true);

    const isValid = checkForErrorAddId();
    if (isValid) {
      const { date, startTime, endTime } = inputValues;
      if (USER.id !== undefined && MEMBER.id !== undefined) {
        const requestValues: PrivatelessonRequest = {
          userId: USER.id,
          issuedTicketId: inputValues.issuedTicketId,
          startAt: `${date}T${startTime}:00.000Z`,
          endAt: `${date}T${endTime}:00.000Z`,
        };
        requestServer(requestValues);
        dispatch(setSelectedDate(date));
      }
    }
  };

  const requestServer = async (requestData: PrivatelessonRequest) => {
    try {
      await request({
        url: 'schedules/private-lesson',
        method: 'post',
        body: requestData,
      });
      dispatch(clearAll());
      navigate('/schedules');
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as ErrorResponse;
      handleModalNotice('일정 등록 오류', errorData?.message, setIsErrorModalOpen, serErrorModal);
      setIsErrorModalOpen(true);
    }
  };

  // 유효성 검사
  const checkForErrorAddId = () => {
    return checkForErrors(errorCheckInput, {
      ...inputValues,
      USER: USER.id,
      MEMBER: MEMBER.id,
    });
  };

  // 회원 모달 오픈 전 실행해야하는 이벤트
  const initiateSearchMember = () => {
    if (!USER.id) {
      handleModalNotice('강사 선택 필수', '담당 강사를 먼저 선택해주세요!', setIsErrorModalOpen, serErrorModal);
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (isSubmit) checkForErrorAddId();
    if (USER.id) updateValidationError('USER', false);
    if (MEMBER.id) updateValidationError('MEMBER', false);
  }, [inputValues, USER, MEMBER]);

  return (
    <>
      <FormContentWrap>
        <TopTitleWrap>
          <h3>개인 수업 일정 생성</h3>
          <p>개인 수업 일정을 생성합니다.</p>
        </TopTitleWrap>
        <FormGridContainer>
          <div>
            {/* 강사선택 */}
            <MemberOrUserSearchButton error={validationErrors.USER} type="USER" />
          </div>
          <div>
            {/* 회원 선택 */}
            <MemberOrUserSearchButton
              error={validationErrors.MEMBER}
              initiateSearch={initiateSearchMember}
              type="MEMBER"
            />
          </div>

          {/* 수강권 선택 */}
          <BookableTicketsList
            error={validationErrors.issuedTicketId}
            inputReset={inputReset}
            inputValues={inputValues}
            onChange={onChange}
          />

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
      {isErrorModalOpen && <NoticeModal innerNotice={errorModal} setIsOpen={setIsErrorModalOpen} />}
    </>
  );
};

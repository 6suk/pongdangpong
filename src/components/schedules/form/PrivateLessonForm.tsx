import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  PrivateLessonInitInput,
  PrivatelessonEditRequest,
  PrivatelessonRequest,
  Schedules_detail_private,
} from '@apis/schedulesAPIs';
import { Button } from '@components/common/Button';
import { DisabledFindUserButton } from '@components/common/DisabledFindUserButton';
import { MemberOrUserSearchButton } from '@components/common/FindUserButton';
import { NoticeModal } from '@components/common/NoticeModal';
import { BookableTicketsList } from '@components/schedules/form/BookableTicketsList';
import { useRequests } from '@hooks/apis/useRequests';
import { useEditMode } from '@hooks/utils/useEditMode';
import { useErrorModal } from '@hooks/utils/useErrorModal';
import useInput from '@hooks/utils/useInput';
import { ValidationProps, useValidation } from '@hooks/utils/useValidation';
import { clearAll, setFindMember, setFindUser } from '@stores/findUsersSlice';
import { setSelectedDate } from '@stores/selectedDateSlice';
import { RootState } from '@stores/store';
import { FormButtonGroup, FormGridContainer } from '@styles/center/ticketFormStyle';
import { FormContentWrap, SC, TopTitleWrap } from '@styles/styles';
import { extractBasePath } from '@utils/extractBasePath';
import { combineDateTime, combineDateTimeToISO, extractDate, extractTime } from '@utils/formatTimestamp';

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

export interface SchedulesFormProps {
  isEditMode?: boolean;
}

export const PrivateLessonForm = ({ isEditMode = false }: SchedulesFormProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request } = useRequests();
  const { pathname } = useLocation();
  const [inputValues, onChange, inputReset] = useInput(PrivateLessonInitInput);
  const { validationErrors, checkForErrors, updateValidationError, isSubmit } = useValidation();
  const { USER, MEMBER } = useSelector((state: RootState) => state.findUsers);
  const { isErrorModalOpen, errorModal, handleAxiosError, handleModalNotice, closeErrorModal } = useErrorModal();

  /** 수정 시 전달받을 데이터 (edit) */
  const editInitializeData = (data: Schedules_detail_private) => {
    const {
      startAt,
      endAt,
      attendanceHistories: [{ member }],
      tutor,
      issuedTicket: { id: issuedTicketId },
      memo,
    } = data;

    dispatch(setFindMember({ id: member.id, name: member.name }));
    dispatch(setFindUser({ id: tutor.id, name: tutor.name }));

    inputReset({
      issuedTicketId,
      memo,
      date: extractDate(startAt),
      startTime: extractTime(startAt),
      endTime: extractTime(endAt),
    });
  };

  const { data } = useEditMode(isEditMode, pathname, editInitializeData);

  /** 수정 시 전송할 데이터 (edit) */
  const editLesson = async () => {
    const { date, startTime, endTime, memo: inputMemo } = inputValues;
    const { startAt, endAt, memo } = data as Schedules_detail_private;

    const requestValues: PrivatelessonEditRequest = {
      memo: inputMemo,
      startAt: combineDateTime(date, startTime),
      endAt: combineDateTime(date, endTime),
    };

    // 데이터가 변경되지 않으면 전송하지 않도록
    if (startAt !== requestValues.startAt || endAt !== requestValues.endAt || memo !== requestValues.memo) {
      await requestServer(requestValues);
    }
  };

  /** 생성 시 전송할 데이터 (new) */
  const createLesson = async () => {
    const { date, startTime, endTime } = inputValues;
    if (USER.id !== undefined && MEMBER.id !== undefined) {
      const requestValues: PrivatelessonRequest = {
        userId: USER.id,
        issuedTicketId: inputValues.issuedTicketId,
        startAt: combineDateTimeToISO(date, startTime),
        endAt: combineDateTimeToISO(date, endTime),
      };
      await requestServer(requestValues);
      dispatch(setSelectedDate(date));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = checkForErrorAddId();
    if (!isValid) return;

    if (isEditMode) {
      await editLesson();
    } else {
      await createLesson();
    }
  };

  /** 서버 전송 (new / edit) */
  const requestServer = async (requestData: PrivatelessonRequest | PrivatelessonEditRequest) => {
    try {
      await request({
        url: extractBasePath(pathname),
        method: isEditMode ? 'put' : 'post',
        body: requestData,
      });
      dispatch(clearAll());
      navigate(isEditMode ? extractBasePath(pathname) : '/schedules');
    } catch (error) {
      handleAxiosError(error, `일정 ${isEditMode ? '수정' : '등록'} 오류`);
    }
  };

  /** 유효성 검사 */
  const checkForErrorAddId = () => {
    return checkForErrors(errorCheckInput, {
      ...inputValues,
      USER: USER.id,
      MEMBER: MEMBER.id,
    });
  };

  /** 유효성 검사 */
  useEffect(() => {
    if (isSubmit) checkForErrorAddId();
    if (USER.id) updateValidationError('USER', false);
    if (MEMBER.id) updateValidationError('MEMBER', false);
  }, [inputValues, USER, MEMBER]);

  /** 회원 모달 오픈 전 실행해야하는 이벤트 */
  const initiateSearchMember = () => {
    if (!USER.id) {
      handleModalNotice('강사 선택 필수', '담당 강사를 먼저 선택해주세요!');
      return false;
    }
    return true;
  };

  useEffect(() => {
    return () => {
      dispatch(clearAll());
    };
  }, []);

  return (
    <>
      <FormContentWrap isSubHeader={false}>
        <TopTitleWrap>
          <h3>개인 수업 일정 {!isEditMode ? `생성` : `수정`}</h3>
          <p>개인 수업 일정을 {!isEditMode ? `생성` : `수정`}합니다.</p>
        </TopTitleWrap>
        <FormGridContainer className={isEditMode ? 'rows-three' : ''}>
          <div>
            {/* 강사선택 */}
            {!isEditMode ? (
              <MemberOrUserSearchButton error={validationErrors.USER} type="USER" />
            ) : (
              <DisabledFindUserButton type="USER" />
            )}
          </div>
          <div>
            {/* 회원 선택 */}
            {!isEditMode ? (
              <MemberOrUserSearchButton
                error={validationErrors.MEMBER}
                initiateSearch={initiateSearchMember}
                type="MEMBER"
              />
            ) : (
              <DisabledFindUserButton type="MEMBER" />
            )}
          </div>

          {/* 수강권 선택 */}
          <BookableTicketsList
            disabled={isEditMode}
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
              value={inputValues.date}
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
          {isEditMode && (
            <div>
              <SC.Label>일정 메모</SC.Label>
              <SC.TextareaField
                maxLength={500}
                name="memo"
                placeholder="내용을 입력해주세요. (500자 이내)"
                style={{ height: '100px' }}
                value={inputValues.memo}
                onChange={onChange}
              />
            </div>
          )}
        </FormGridContainer>
        <FormButtonGroup>
          <Button
            isPri={false}
            size="full"
            onClick={() => {
              navigate(-1);
            }}
          >
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

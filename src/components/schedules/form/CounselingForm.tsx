import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { CounselingInitInput, CounselingRequest, Schedules_detail_counseling } from '@apis/schedulesAPIs';
import { Button } from '@components/common/Button';
import { MemberOrUserSearchButton } from '@components/common/FindUserButton';
import { InputField } from '@components/common/InputField';
import { NoticeModal } from '@components/common/NoticeModal';
import { useRequests } from '@hooks/apis/useRequests';
import { useEditMode } from '@hooks/utils/useEditMode';
import { useErrorModal } from '@hooks/utils/useErrorModal';
import useInput from '@hooks/utils/useInput';
import { ValidationProps, useValidation } from '@hooks/utils/useValidation';
import { clearAll, setFindUser } from '@stores/findUsersSlice';
import { setSelectedDate } from '@stores/selectedDateSlice';
import { RootState } from '@stores/store';
import { FormButtonGroup, FormGridContainer } from '@styles/center/ticketFormStyle';
import { FormContentWrap, SC, TopTitleWrap } from '@styles/styles';

import { extractBasePath } from '@utils/extractBasePath';
import { combineDateTime, extractDate, extractTime } from '@utils/schedules/formatTimestamp';

import { SchedulesFormProps } from './PrivateLessonForm';

const errorCheckInput: ValidationProps[] = [
  { name: 'USER', type: 'number' },
  { name: 'clientName', type: 'string' },
  { name: 'clientPhone', type: 'string' },
  { name: 'date', type: 'string' },
  { name: 'startTime', type: 'string' },
  { name: 'endTime', type: 'string' },
];

export const CounselingForm = ({ isEditMode = false }: SchedulesFormProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request } = useRequests();
  const { pathname } = useLocation();
  const { validationErrors, checkForErrors, updateValidationError, isSubmit } = useValidation();
  const { isErrorModalOpen, errorModal, handleAxiosError, closeErrorModal } = useErrorModal();
  const [inputValues, onChange, inputReset] = useInput(CounselingInitInput);
  const USER = useSelector((state: RootState) => state.findUsers.USER);
  const selectedDate = useSelector((state: RootState) => state.calendar.checkDate);

  /** 수정 시 전달받을 데이터 (edit) */
  const editInitializeData = (data: Schedules_detail_counseling) => {
    const {
      startAt,
      endAt,
      memo,
      client: { name: clientName, phone: clientPhone },
      counselor: { id: userId, name: userName },
    } = data;

    dispatch(setFindUser({ id: userId, name: userName }));

    inputReset({
      clientName,
      clientPhone,
      memo,
      date: extractDate(startAt),
      startTime: extractTime(startAt),
      endTime: extractTime(endAt),
    });
  };
  const { data } = useEditMode(isEditMode, pathname, editInitializeData);

  /** 수정 시 변경값 검사 (edit) */
  const editCounseling = async (requestValues: CounselingRequest) => {
    const {
      startAt,
      endAt,
      memo,
      client: { name, phone },
      counselor: { id },
    } = data as Schedules_detail_counseling;

    // 데이터가 변경되지 않으면 전송하지 않도록
    if (
      startAt !== requestValues.startAt ||
      endAt !== requestValues.endAt ||
      memo !== requestValues.memo ||
      name !== requestValues.clientName ||
      phone !== requestValues.clientPhone ||
      id !== requestValues.userId
    ) {
      await requestServer(requestValues);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = checkForErrorAddId();
    if (!isValid) return;

    const { date, startTime, endTime } = inputValues;
    if (USER.id !== undefined) {
      const requestValues: CounselingRequest = {
        clientName: inputValues.clientName,
        clientPhone: inputValues.clientPhone,
        memo: inputValues.memo,
        memberId: 0,
        userId: USER.id,
        startAt: combineDateTime(date, startTime),
        endAt: combineDateTime(date, endTime),
      };

      if (isEditMode) {
        editCounseling(requestValues);
      } else {
        requestServer(requestValues);
        dispatch(setSelectedDate(date));
      }
    }
  };

  useEffect(() => {
    if (!isEditMode) inputReset({ ...inputValues, date: selectedDate });

    return () => {
      dispatch(clearAll());
    };
  }, []);

  /** 서버 전송 (new / edit) */
  const requestServer = async (requestData: CounselingRequest) => {
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
    });
  };

  /** 유효성 검사 */
  useEffect(() => {
    if (isSubmit) checkForErrorAddId();
    if (USER.id) updateValidationError('USER', false);
  }, [inputValues, USER]);

  return (
    <>
      <FormContentWrap $isSubHeader={false}>
        <TopTitleWrap>
          <h3>상담 일정 {!isEditMode ? `생성` : `수정`}</h3>
          <p>상담 일정을 {!isEditMode ? `생성` : `수정`}합니다.</p>
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
            <SC.TextareaField
              maxLength={500}
              name="memo"
              placeholder="내용을 입력해주세요. (500자 이내)"
              style={{ height: '260px' }}
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

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';

import {
  MemberAddTicketRequest,
  MemberDetailResponse,
  MemberEditTicketRequest,
  MemberTicketAddFormType,
  MemberTicketEditFormType,
} from '@apis/membersAPIs';
import { TermUnitEnum, ticket_defaultTermUnit } from '@apis/ticketsAPIs';
import { Button } from '@components/common/Button';
import { MemberOrUserSearchButton } from '@components/common/FindUserButton';
import { InputField } from '@components/common/InputField';
import { NoticeModal } from '@components/common/NoticeModal';
import { useRequests } from '@hooks/apis/useRequests';
import { useSwrData } from '@hooks/apis/useSwrData';
import { useErrorModal } from '@hooks/utils/useErrorModal';
import useInput from '@hooks/utils/useInput';
import { ValidationProps, useValidation } from '@hooks/utils/useValidation';
import { setFindUser } from '@stores/findUsersSlice';
import { RootState } from '@stores/store';
import { FormButtonGroup, FormGridContainer, InputCountStyle, LabelNotice, Unit } from '@styles/common/FormStyle';
import { SC } from '@styles/common/inputsStyles';
import { FormContentWrap, TopTitleWrap } from '@styles/common/wrapStyle';

type InitialFormType<T extends boolean> = T extends true ? MemberTicketEditFormType : MemberTicketAddFormType;
type RequestType<T extends boolean> = T extends true ? MemberEditTicketRequest : MemberAddTicketRequest;

export interface requestInfoType {
  url: string;
  method: 'put' | 'post';
}

export interface IssueTicketFormProps<T extends boolean> {
  requestInfo: requestInfoType;
  ticket: TicketInfo;
  initialForm: {
    error: ValidationProps[];
    init: InitialFormType<T>;
  };
  isEditMode: T;
}

export interface TicketInfo {
  title: string;
  defaultTerm: string | number;
  startAt?: string;
  endAt?: string;
  defaultTermUnit: ticket_defaultTermUnit;
  defaultCount: string | number;
  maxServiceCount: number;
  serviceCount?: number;
  tutor: {
    id: number;
    name: string;
  };
}

export const IssueTicketFormComponent = <T extends boolean>({
  requestInfo,
  ticket,
  initialForm,
  isEditMode,
}: IssueTicketFormProps<T>) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { memberId } = useParams();
  const { data: memberData } = useSwrData<MemberDetailResponse>(`members/${memberId}`);
  const { checkForErrors, updateValidationError, validationErrors, isSubmit } = useValidation();
  const [inputValues, onChange, inputReset] = useInput({ ...initialForm.init });
  const [count, setCount] = useState(ticket.serviceCount || 0);
  const { request } = useRequests();
  const { isErrorModalOpen, closeErrorModal, errorModal, handleAxiosError } = useErrorModal();
  const tutorId = useSelector((state: RootState) => state.findUsers.USER.id) || 0;

  useEffect(() => {
    dispatch(setFindUser({ id: ticket.tutor.id, name: ticket.tutor.name }));
  }, [ticket, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = checkForErrorAddId();

    if (memberData && isValid) {
      switch (isEditMode) {
        // edit
        case true:
          {
            const requestValues: RequestType<true> = {
              ...(inputValues as unknown as InitialFormType<true>),
              tutorId,
            };
            // 값이 같지 않을 경우에만 실행
            if (initialForm.init.endAt === requestValues.endAt && tutorId === ticket.tutor.id) return;
            requestForServer(requestValues);
          }
          break;
        // new
        case false:
          {
            const requestValues: RequestType<false> = {
              ...(inputValues as unknown as InitialFormType<false>),
              privateTutorId: tutorId,
              memberIds: [memberData.id],
              serviceCount: count,
            };
            requestForServer(requestValues);
          }
          break;
      }
    }
  };

  const requestForServer = async (requestValues: RequestType<boolean>) => {
    try {
      await request({
        ...requestInfo,
        body: requestValues,
      });
      if (isEditMode) {
        navigate(-1);
      } else {
        navigate(`/members/${memberId}`);
      }
    } catch (error) {
      handleAxiosError(error, '수강권 부여 오류');
      console.log(error);
    }
  };

  const checkForErrorAddId = () => {
    return checkForErrors(initialForm.error, { ...inputValues, privateTutorId: tutorId });
  };

  useEffect(() => {
    if (isSubmit) checkForErrorAddId();
    if (tutorId) updateValidationError('privateTutorId', false);
  }, [inputValues, tutorId]);

  return (
    <>
      {ticket && (
        <FormContentWrap>
          <TopTitleWrap>
            <h3>
              {ticket.title}
              {!isEditMode ? ' 부여' : ' 부여 수정'}
            </h3>
            {memberData &&
              (!isEditMode ? (
                <p>{memberData.name} 회원님에게 수강권을 부여합니다.</p>
              ) : (
                <p>{memberData.name} 회원님에게 부여된 수강권을 수정합니다.</p>
              ))}
          </TopTitleWrap>
          <FormGridContainer className="rows-three">
            <div>
              <InputField
                disabled={true}
                label="수강권명"
                name="title"
                placeholder="수강권명"
                type="text"
                value={ticket.title}
              />
            </div>
            <div>
              <div>
                <SC.Label>
                  유효기간 <span></span>
                </SC.Label>
                <div className="time-inputs">
                  <SC.InputField
                    className={validationErrors.startAt ? 'error' : ''}
                    disabled={isEditMode}
                    name="startAt"
                    type="date"
                    value={(ticket.startAt as string) || (inputValues.startAt as string)}
                    onChange={onChange}
                  />
                  ~
                  <SC.InputField
                    className={validationErrors.endAt ? 'error' : ''}
                    name="endAt"
                    type="date"
                    value={(ticket.endAt as string) || (inputValues.endAt as string)}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <InputField
                disabled={true}
                label="수강권 기간"
                name="duration"
                placeholder="0"
                type="text"
                unit={ticket.defaultTerm ? TermUnitEnum[ticket.defaultTermUnit || 'DAY'] : ''}
                value={ticket.defaultTerm}
              />
            </div>
            <div>
              <InputField
                disabled={true}
                label="기본횟수"
                name="defaultCount"
                type="text"
                unit="회"
                value={ticket.defaultCount}
              />
            </div>
            <div>
              <SC.Label htmlFor="maxServiceCount">
                서비스 횟수<LabelNotice>최대 가능 횟수 {ticket.maxServiceCount}회</LabelNotice>
              </SC.Label>
              <InputCountStyle>
                <button
                  disabled={isEditMode}
                  type="button"
                  onClick={() => {
                    if (count > 0) setCount((prev: number) => prev - 1);
                  }}
                >
                  -
                </button>
                <Unit>
                  <SC.InputField
                    readOnly
                    disabled={isEditMode}
                    id="maxServiceCount"
                    name="maxServiceCount"
                    style={{ textAlign: 'center' }}
                    value={count + ' 회'}
                    onChange={onChange}
                  />
                </Unit>
                <button
                  disabled={isEditMode}
                  type="button"
                  onClick={() => {
                    if (count < (ticket.maxServiceCount || 0)) setCount((prev: number) => prev + 1);
                  }}
                >
                  +
                </button>
              </InputCountStyle>
            </div>
            <div>
              <MemberOrUserSearchButton error={validationErrors.privateTutorId} type="USER" />
            </div>
          </FormGridContainer>
          <FormButtonGroup>
            <Button isPri={false} size="full" onClick={() => navigate(-1)}>
              돌아가기
            </Button>
            {!isEditMode && (
              <Button size="full" type="button" onClick={handleSubmit}>
                완료
              </Button>
            )}
            {isEditMode && (
              <Button size="full" type="button" onClick={handleSubmit}>
                완료
              </Button>
            )}
          </FormButtonGroup>
        </FormContentWrap>
      )}
      {isErrorModalOpen && <NoticeModal innerNotice={errorModal} setIsOpen={closeErrorModal} />}
    </>
  );
};

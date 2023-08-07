import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';

import { MemberAddTicketInitForm, MemberAddTicketRequest } from '@apis/membersAPIs';
import { TermUnitEnum, Ticket_response } from '@apis/ticketsAPIs';
import { Button } from '@components/common/Button';
import { MemberOrUserSearchButton } from '@components/common/FindUserButton';
import { InputField, Unit } from '@components/common/InputField';
import { useRequests } from '@hooks/apis/useRequests';
import { useSwrData } from '@hooks/apis/useSwrData';
import useInput from '@hooks/utils/useInput';
import { useValidation } from '@hooks/utils/useValidation';
import { setFindUser } from '@stores/findUsersSlice';
import { RootState } from '@stores/store';
import { FormButtonGroup, FormGridContainer, InputCountStyle, LabelNotice } from '@styles/center/ticketFormStyle';
import { FormContentWrap, SC, TopTitleWrap } from '@styles/styles';

export const MemberAddTicket = () => {
  const navigate = useNavigate();
  const { id, ticketId } = useParams();
  const { data } = useSwrData<Ticket_response>(`tickets/${ticketId}`);
  const name = useSelector((state: RootState) => state.findUsers.MEMBER.name);
  const privateTutorId = useSelector((state: RootState) => state.findUsers.USER.id);
  const { id: loginTutorId, name: loginTutorName } = useSelector((state: RootState) => state.tokens.user) || {};
  const { checkForErrors, updateValidationError, validationErrors, isSubmit } = useValidation();
  const [inputValues, onChange, inputReset] = useInput({ ...MemberAddTicketInitForm });
  const [count, setCount] = useState(0);
  const { request } = useRequests();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFindUser({ id: loginTutorId, name: loginTutorName }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = checkForErrorAddId();
    if (privateTutorId !== undefined && id !== undefined && isValid) {
      const requestValues: MemberAddTicketRequest = {
        ...inputValues,
        privateTutorId,
        memberIds: [parseInt(id)],
        serviceCount: count,
      };

      try {
        await request({
          method: 'post',
          url: `tickets/${ticketId}/issue`,
          body: requestValues,
        });
        navigate(`/members/${id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const checkForErrorAddId = () => {
    return checkForErrors(
      [
        { name: 'startAt', type: 'string' },
        { name: 'endAt', type: 'string' },
        { name: 'privateTutorId', type: 'number' },
      ],
      { ...inputValues, privateTutorId }
    );
  };

  useEffect(() => {
    if (isSubmit) checkForErrorAddId();
    if (privateTutorId) updateValidationError('privateTutorId', false);
  }, [inputValues, privateTutorId]);

  return (
    data && (
      <FormContentWrap>
        <TopTitleWrap>
          <h3>{data.title} 부여</h3>
          <p>{name} 회원님에게 수강권을 부여합니다.</p>
        </TopTitleWrap>
        <FormGridContainer className="rows-three">
          <div>
            <InputField
              disabled={true}
              label="수강권명"
              name="title"
              placeholder="수강권명"
              type="text"
              value={data.title}
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
                  name="startAt"
                  type="date"
                  value={inputValues.startAt}
                  onChange={onChange}
                />
                ~
                <SC.InputField
                  className={validationErrors.endAt ? 'error' : ''}
                  name="endAt"
                  type="date"
                  value={inputValues.endAt}
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
              unit={data.defaultTerm ? TermUnitEnum[data.defaultTermUnit || 'DAY'] : ''}
              value={data.defaultTerm || '소진시까지'}
            />
          </div>
          <div>
            <InputField
              disabled={true}
              label="기본횟수"
              name="defaultCount"
              type="text"
              unit="회"
              value={data.defaultCount || '무제한'}
            />
          </div>
          <div>
            <SC.Label htmlFor="maxServiceCount">
              서비스 횟수<LabelNotice>최대 가능 횟수 {data.maxServiceCount}회</LabelNotice>
            </SC.Label>
            <InputCountStyle>
              <button
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
                  if (count < (data.maxServiceCount || 0)) setCount((prev: number) => prev + 1);
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
          <Button size="full" type="button" onClick={handleSubmit}>
            완료
          </Button>
        </FormButtonGroup>
      </FormContentWrap>
    )
  );
};

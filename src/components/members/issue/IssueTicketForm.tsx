import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { MemberTicketAddFormType } from '@apis/membersAPIs';
import { Ticket_response } from '@apis/ticketsAPIs';
import { useSwrData } from '@hooks/apis/useSwrData';
import { ValidationProps } from '@hooks/utils/useValidation';
import { setFindUser } from '@stores/findUsersSlice';
import { RootState } from '@stores/store';
import { formatDateString } from '@utils/schedules/formatTimestamp';
import { getCurrentDate } from '@utils/schedules/getDate';

import { IssueTicketFormComponent, requestInfoType } from './IssueTicketFormComponent';

const IssueTicketErrorForm: ValidationProps[] = [
  { name: 'startAt', type: 'string' },
  { name: 'endAt', type: 'string' },
  { name: 'privateTutorId', type: 'number' },
];

const IssueTicketFormInitForm: MemberTicketAddFormType = {
  serviceCount: 0,
  startAt: formatDateString(getCurrentDate()),
  endAt: formatDateString(getCurrentDate()),
};

const initialForm = {
  error: IssueTicketErrorForm,
  init: IssueTicketFormInitForm,
};

export const IssueTickeForm = () => {
  const { ticketId } = useParams();
  const user = useSelector((state: RootState) => state.tokens.user);
  const { data } = useSwrData<Ticket_response>(`tickets/${ticketId}`);
  const requestInfo: requestInfoType = {
    url: `tickets/${ticketId}/issue`,
    method: 'post',
  };

  return (
    data &&
    user && (
      <IssueTicketFormComponent
        initialForm={initialForm}
        isEditMode={false}
        requestInfo={requestInfo}
        ticket={{
          defaultCount: data.defaultCount || '무제한',
          defaultTerm: data.defaultTerm || '소진시 까지',
          defaultTermUnit: data.defaultTermUnit || 'DAY',
          maxServiceCount: data.maxServiceCount || 0,
          title: data.title,
          tutor: {
            id: user.id,
            name: user.name,
          },
        }}
      />
    )
  );
};

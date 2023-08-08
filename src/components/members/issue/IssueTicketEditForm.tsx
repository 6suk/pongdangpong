import { useParams } from 'react-router-dom';

import { Ticket_issued_detail_res } from '@apis/ticketsAPIs';
import { useSwrData } from '@hooks/apis/useSwrData';
import { ValidationProps } from '@hooks/utils/useValidation';

import { IssueTicketFormComponent, requestInfoType } from './IssueTicketFormComponent';

const IssueTicketErrorForm: ValidationProps[] = [
  { name: 'endAt', type: 'string' },
  { name: 'privateTutorId', type: 'number' },
];

export const IssueTicketEditForm = () => {
  const { issuedTicketId } = useParams();
  const { data } = useSwrData<Ticket_issued_detail_res>(`issued-tickets/${issuedTicketId}`);
  const requestInfo: requestInfoType = {
    url: `issued-tickets/${issuedTicketId}`,
    method: 'put',
  };

  return (
    data && (
      <IssueTicketFormComponent
        isEditMode={true}
        requestInfo={requestInfo}
        initialForm={{
          error: IssueTicketErrorForm,
          init: {
            endAt: data.endAt,
          },
        }}
        ticket={{
          defaultCount: data.defaultCount || '무제한',
          defaultTerm: data.defaultTerm || '소진시 까지',
          defaultTermUnit: data.defaultTermUnit || 'DAY',
          maxServiceCount: data.maxServiceCount || 0,
          title: data.title,
          startAt: data.startAt,
          serviceCount: data.serviceCount || 0,
          tutor: {
            id: data.privateTutor.id,
            name: data.privateTutor.name,
          },
        }}
      />
    )
  );
};

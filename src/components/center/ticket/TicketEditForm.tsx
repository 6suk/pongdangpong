import { useParams } from 'react-router-dom';

import { tickets_put } from '@apis/ticketsAPIs';
import { useRequests } from '@hooks/apis/useRequests';
import { useSwrData } from '@hooks/apis/useSwrData';

import { TicketFormComponent, TicketFormDataType } from './form/TicketFormComponent';

export const TicketEditForm = () => {
  const { id } = useParams();
  const { data, isLoading } = useSwrData(`tickets/${id}`);
  const { request } = useRequests();

  if (isLoading) {
    return null;
  }

  const onSubmit = async (data: TicketFormDataType) => {
    const { url, method } = tickets_put;
    await request({ url, method, path: `/${id}`, body: data });
  };

  return (
    <TicketFormComponent
      isEditMode
      initialData={{
        ...data,
        duration: data.duration || data.bookableLessons[0].duration,
        defaultCount: data.defaultCount || 0,
        defaultTerm: data.defaultTerm || 0,
        maxServiceCount: data.maxServiceCount || 0,
      }}
      onSubmit={onSubmit}
    />
  );
};

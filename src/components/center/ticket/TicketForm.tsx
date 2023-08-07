import { tickets_create } from '@apis/ticketsAPIs';

import { TicketFormComponent, TicketFormDataType } from '@components/center/ticket/TicketFormComponent';
import { useRequests } from '@hooks/apis/useRequests';

export interface ValidationErrors {
  [key: string]: boolean;
}

export const TicketForm = () => {
  const { request } = useRequests();

  const onSubmit = async (data: TicketFormDataType) => {
    const { url, method } = tickets_create;
    await request({
      url,
      method,
      body: data,
    });
  };

  return (
    <>
      <TicketFormComponent onSubmit={onSubmit} />
    </>
  );
};

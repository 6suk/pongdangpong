import { tickets_create } from '@apis/ticketsAPIs';

import { useRequests } from '@hooks/apis/useRequests';

import { TicketFormComponent, TicketFormDataType } from './Form/TicketFormComponent';

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

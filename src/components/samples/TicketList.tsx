import { Ticket_response, tickets_list } from '@apis/ticketsAPIs';
import { TicketItem } from '@components/samples/TicketItem';

import { useSwrData } from '@hooks/apis/useSwrData';

export const TicketList = () => {
  const { data, isError, isLoading } = useSwrData(tickets_list.url);

  return (
    <>
      <ul style={{ listStyle: 'none' }}>
        {!isLoading &&
          data.tickets.map((ticket: Ticket_response) => {
            return <TicketItem key={ticket.id} ticket={ticket} />;
          })}
      </ul>

      {isError && <p>{isError.response?.data.message}</p>}
    </>
  );
};

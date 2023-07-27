import { Link } from 'react-router-dom';

import { Ticket_response, tickets_list } from '@apis/ticketsAPIs';
import { STicketItem } from '@components/samples/STicketItem';

import { useSwrData } from '@hooks/apis/useSwrData';

export const STicketList = () => {
  const { data, isError, isLoading } = useSwrData(tickets_list.url);

  return (
    <>
      <Link to={'/sample/create'}>{'티겟 생성 >'}</Link>
      <ul style={{ listStyle: 'none' }}>
        {!isLoading &&
          data.tickets.map((ticket: Ticket_response) => {
            return <STicketItem key={ticket.id} ticket={ticket} />;
          })}
      </ul>

      {isError && <p>{isError.response?.data.message}</p>}
    </>
  );
};

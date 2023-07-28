import { useParams } from 'react-router-dom';

export const TicketIssued = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

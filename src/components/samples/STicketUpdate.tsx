import { useNavigate } from 'react-router-dom';

import { Ticket_put_body, tickets_put } from '@apis/ticketsAPIs';
import { reqDataState } from '@hooks/apis/useRequests';
import useInput from '@hooks/utils/useInput';

import { TicketProps } from './STicketItem';

interface TicketUpdateProps extends TicketProps {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  request: (data: reqDataState) => Promise<void>;
}

export const STicketUpdate = ({ ticket, setIsEdit, request }: TicketUpdateProps) => {
  const navigate = useNavigate();

  const initTicket: Ticket_put_body = {
    defaultCount: ticket.defaultCount,
    defaultTerm: ticket.defaultTerm,
    defaultTermUnit: ticket.defaultTermUnit,
    maxServiceCount: ticket.maxServiceCount,
  };

  const [inputValues, onChange, inputReset] = useInput({ ...initTicket });

  const handleSubmit = (id: number) => async (e: React.FormEvent) => {
    e.preventDefault();
    const { url, method } = tickets_put;

    try {
      await request({
        url,
        method,
        body: inputValues,
        path: `/${id}`,
      });
      navigate('/tickets/list');
      inputReset();
    } catch (error) {
      console.log(error);
    }

    setIsEdit(false);
  };

  return (
    <form onSubmit={handleSubmit(ticket.id)}>
      <input disabled id="lessonType" name="lessonType" placeholder="수업유형" type="text" value={ticket.lessonType} />
      <input disabled name="title" placeholder="수강권명" type="text" value={ticket.title} />
      <input
        required
        name="defaultTerm"
        placeholder="수강권 기간"
        type="number"
        value={inputValues.defaultTerm}
        onChange={onChange}
      />
      <input required name="defaultTerm" type="text" value={inputValues.defaultTermUnit} onChange={onChange} />
      <input disabled name="dailyCountLimit" placeholder="시간" type="number" value={ticket.dailyCountLimit} />
      <input
        name="defaultCount"
        placeholder="기본횟수"
        type="number"
        value={inputValues.defaultCount}
        onChange={onChange}
      />
      <input type="submit" value="등록" />
    </form>
  );
};

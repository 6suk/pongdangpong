import { useCallback, useState } from 'react';

import { Link } from 'react-router-dom';

import { Ticket_response, tickets_delete } from '@apis/ticketsAPIs';

import { useRequests } from '@hooks/apis/useRequests';

import { STicketUpdate } from './STicketUpdate';

export interface TicketProps {
  ticket: Ticket_response;
}

export const STicketItem = ({ ticket }: TicketProps) => {
  const { request } = useRequests();
  const [isEdit, setIsEdit] = useState(false);
  const {
    id,
    title,
    lessonType,
    defaultCount,
    defaultTerm,
    defaultTermUnit,
    isActive,
    issuedTicketCount,
    maxServiceCount,
  } = ticket;

  const handleDelete = useCallback(
    (id: number) => async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { method, url } = tickets_delete;
      await request({
        url,
        method,
        path: `/${id}`,
      });
    },
    [request]
  );

  return (
    <>
      {!isEdit ? (
        <li style={{ marginBottom: '50px' }}>
          <p style={{ fontWeight: 'bold' }}>{title}</p>
          <p>lessonType : {lessonType}</p>
          <p>defaultCount : {defaultCount}</p>
          <p>
            defaultTerm : {defaultTerm} {defaultTermUnit}
          </p>
          <p>isActive : {String(isActive)}</p>
          <p>issuedTicketCount : {issuedTicketCount}</p>
          <p>maxServiceCount : {maxServiceCount}</p>

          <form onSubmit={handleDelete(id)}>
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded mr-2"
              type="submit"
              value="삭제하기"
            />
          </form>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded mr-2"
            type="button"
            onClick={() => setIsEdit(true)}
          >
            수정하기
          </button>
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded mr-2"
            to={`/tickets/${id}/issued-tickets`}
          >
            부여내역보기
          </Link>
        </li>
      ) : (
        <STicketUpdate request={request} setIsEdit={setIsEdit} ticket={ticket} />
      )}
    </>
  );
};

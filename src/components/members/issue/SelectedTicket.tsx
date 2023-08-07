import { useNavigate } from 'react-router-dom';

import { BackButton } from '@/pages/Mypage';
import { Ticket_response } from '@apis/ticketsAPIs';
import { BackIcon } from '@assets/icons/indexIcons';
import { useSwrData } from '@hooks/apis/useSwrData';

import { TicketContainer, TicketWrap } from '@styles/center/ticketsStyle';

import { SchedulesDetailWrap } from '@styles/SchedulesStyle';

import { TicketItem } from './TicketItem';

export const SelectedTicket = () => {
  const navigate = useNavigate();
  const { data } = useSwrData<{ tickets: Ticket_response[] }>(`tickets`);

  return (
    <>
      <SchedulesDetailWrap style={{ gap: '1rem' }}>
        <div className="header">
          <div className="title">
            <h3>수강권 부여 - 수강권 선택</h3>
          </div>
          <BackButton onClick={() => navigate('/members')}>
            <BackIcon />
            <p>뒤로가기</p>
          </BackButton>
        </div>
        <TicketContainer>
          <TicketWrap>
            {data &&
              data.tickets
                .filter((v: Ticket_response) => v.isActive === true)
                .reverse()
                .map((ticket: Ticket_response) => {
                  return <TicketItem key={ticket.id} ticket={ticket} />;
                })}
          </TicketWrap>
        </TicketContainer>
      </SchedulesDetailWrap>
    </>
  );
};

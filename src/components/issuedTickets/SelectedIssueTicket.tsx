import { useNavigate } from 'react-router-dom';

import { TicketListResponse } from '@apis/types/ticketsTypes';
import { BackIcon } from '@assets/icons/indexIcons';
import { TicketItem } from '@components/issuedTickets/TicketItem';
import { useSwrData } from '@hooks/apis/useSwrData';

import { BackButton } from '@styles/common/buttonStyle';
import { TicketContainer, TicketWrap } from '@styles/common/ticketsStyle';
import { DetailWrap } from '@styles/common/wrapStyle';

export const SelectedIssueTicket = () => {
  const navigate = useNavigate();
  const { data } = useSwrData<{ tickets: TicketListResponse[] }>(`tickets`);

  return (
    <>
      <DetailWrap $marginTop="0" style={{ gap: '1rem' }}>
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
                .filter((v: TicketListResponse) => v.isActive === true)
                .reverse()
                .map((ticket: TicketListResponse) => {
                  return <TicketItem key={ticket.id} ticket={ticket} />;
                })}
          </TicketWrap>
        </TicketContainer>
      </DetailWrap>
    </>
  );
};

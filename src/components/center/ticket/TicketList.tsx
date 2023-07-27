import { styled } from 'styled-components';

import { Ticket_response } from '@apis/ticketsAPIs';
import theme from '@styles/theme';

import { TicketContainer, TicketItem, TicketWrap } from './TicketItem';

export const TicketList = () => {
  return (
    <>
      <TicketContainer>
        <Top>
          <div className="flex flex-row gap-2">
            <p>판매중</p>
            <p>판매종료</p>
          </div>
          <Button>+ 수강권 추가</Button>
        </Top>
        <TicketWrap>
          {dummyData.map(ticket => {
            return <TicketItem key={ticket.id} ticket={ticket} />;
          })}
        </TicketWrap>
      </TicketContainer>
    </>
  );
};

const Button = styled.button`
  transition: all 0.4s;
  font-size: ${theme.font.sub};
  background-color: ${theme.colors.pri[500]};
  color: ${theme.colors.White};
  width: 146px;
  box-sizing: border-box;
  padding-inline: 2rem;
  padding-block: 0.8rem;
  border-radius: 6px;

  &:hover {
    background-color: ${theme.colors.pri[400]};
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-block: 2rem;
  align-items: center;
  margin-inline: 1rem;
  align-items: flex-end;
`;

const dummyData: Array<Ticket_response> = [
  {
    id: 0,
    title: '[이벤트 특가] 설맞이 30%할인 [이벤트 특가] 설맞이 30%할인',
    lessonType: 'SINGLE',
    defaultCount: 3, // 기본 횟수
    dailyCountLimit: 60, // 수업 시간 (분)
    isActive: true, // 판매중
    issuedTicketCount: 3, // 부여 (건)
    defaultTerm: 1,
    defaultTermUnit: 'DAY', // 수강권 기간
    maxServiceCount: 0, // 서비스 횟수
  },
  {
    id: 1,
    title: '[이벤트 특가] 설맞이 30%할인',
    lessonType: 'SINGLE',
    defaultCount: 6, // 기본 횟수
    dailyCountLimit: 120, // 수업 시간 (분)
    isActive: true, // 판매중
    issuedTicketCount: 1, // 부여 (건)
    defaultTerm: 3,
    defaultTermUnit: 'DAY', // 수강권 기간
    maxServiceCount: 0, // 서비스 횟수
  },
  {
    id: 2,
    title: '[이벤트 특가] 설맞이 30%할인',
    lessonType: 'SINGLE',
    defaultCount: 4, // 기본 횟수
    dailyCountLimit: 30, // 수업 시간 (분)
    isActive: true, // 판매중
    issuedTicketCount: 2, // 부여 (건)
    defaultTerm: 2,
    defaultTermUnit: 'DAY', // 수강권 기간
    maxServiceCount: 0, // 서비스 횟수
  },
];

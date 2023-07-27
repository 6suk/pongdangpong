import { LessonTypeEnum, TermUnitEnum, Ticket_response } from '@apis/ticketsAPIs';
import ticketIcon from '@assets/icons/ticket/ticketIcon.svg';
import ticketIcon_w from '@assets/icons/ticket/ticketIcon_w.svg';

import { TS } from '@components/center/ticket/TicketItem';

interface TicketItemProps {
  ticket: Ticket_response;
}

export const TicketItem = ({ ticket }: TicketItemProps) => {
  const {
    id,
    title,
    lessonType,
    isActive,
    issuedTicketCount,
    defaultCount,
    dailyCountLimit,
    defaultTerm,
    defaultTermUnit,
  } = ticket;
  return (
    <>
      <TS.Ticket $isActive={isActive}>
        <TS.TicketLeft className="ticket-left">
          <TS.LeftTitle>
            <div className="title">
              <h3>{title}</h3>
              <p className="tag">{LessonTypeEnum[lessonType]}</p>
            </div>
            <div className="icon">
              <img alt="ticket-icon" src={isActive ? ticketIcon : ticketIcon_w} />
            </div>
          </TS.LeftTitle>
          <TS.LeftInfo>
            {/* 본인 데이터에 맞는 목록 추가 */}
            <dl>
              <dt>부여</dt>
              <dd>{`${issuedTicketCount}건`}</dd>
            </dl>
            <dl>
              <dt>수강권 횟수</dt>
              <dd>{`${defaultCount}회`}</dd>
            </dl>
            <dl>
              <dt>수업 시간</dt>
              <dd>{`${dailyCountLimit}분`}</dd>
            </dl>
            <dl>
              <dt>수강권 기간</dt>
              <dd>{`${defaultTerm}${TermUnitEnum[defaultTermUnit]}`}</dd>
            </dl>
          </TS.LeftInfo>
        </TS.TicketLeft>
        <TS.TicketRight className="ticket-right">
          {/* 각각 버튼에 맞는 행동 추가 */}
          <button
            type="button"
            onClick={() => {
              console.log(id + ' 수강권 부여내역 클릭');
            }}
          >
            수강권 부여내역
          </button>
          <button
            type="button"
            onClick={() => {
              console.log(id + ' 판매종료 클릭');
            }}
          >
            판매종료
          </button>
          <button
            type="button"
            onClick={() => {
              console.log(id + ' 수정/삭제');
            }}
          >
            수정 / 삭제
          </button>
        </TS.TicketRight>
      </TS.Ticket>
    </>
  );
};

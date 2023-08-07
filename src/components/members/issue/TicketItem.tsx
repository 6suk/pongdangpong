import { useNavigate } from 'react-router-dom';

import { LessonTypeEnum, TermUnitEnum, Ticket_response } from '@apis/ticketsAPIs';
import { TicketIcon } from '@assets/icons/indexIcons';
import { TS } from '@styles/center/ticketsStyle';

interface TicketItemProps {
  ticket: Ticket_response;
}
export const TicketItem = ({ ticket }: TicketItemProps) => {
  const navigate = useNavigate();
  const { id, title, lessonType, issuedTicketCount, defaultCount, defaultTerm, defaultTermUnit, bookableLessons } =
    ticket;

  const duration = bookableLessons[0].duration;

  return (
    <>
      <TS.Ticket $isActive={true} className="select-ticket" onClick={() => navigate(`${id}/issue`)}>
        <TS.TicketLeft className="ticket-left">
          <TS.LeftTitle>
            <div className="title">
              <h3>{title}</h3>
              <p className="tag">{LessonTypeEnum[lessonType]}</p>
            </div>
            <div className="icon">
              <TicketIcon />
            </div>
          </TS.LeftTitle>
          <TS.LeftInfo>
            <dl>
              <dt>부여</dt>
              <dd>{`${issuedTicketCount}건`}</dd>
            </dl>
            <dl>
              <dt>수강권 횟수</dt>
              <dd>{defaultCount ? `${defaultCount}회` : '무제한'}</dd>
            </dl>
            <dl>
              <dt>수업 시간</dt>
              <dd>{`${duration}분`}</dd>
            </dl>
            <dl>
              <dt>수강권 기간</dt>
              <dd>
                {defaultTerm && defaultTermUnit ? `${defaultTerm}${TermUnitEnum[defaultTermUnit]}` : '소진시 까지'}
              </dd>
            </dl>
          </TS.LeftInfo>
        </TS.TicketLeft>
      </TS.Ticket>
    </>
  );
};

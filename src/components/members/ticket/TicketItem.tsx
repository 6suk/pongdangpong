import { LessonTypeEnum, TermUnitEnum, Ticket_response } from '@apis/ticketsAPIs';
import { TicketIcon } from '@assets/icons/indexIcons';
import { TS } from '@styles/center/ticketsStyle';

interface TicketItemProps {
  ticket: Ticket_response;
}

export const TicketItem = ({ ticket, setTicketData }: TicketItemProps) => {
  const {
    id,
    title,
    lessonType,
    isActive = true,
    serviceCount,
    remainingCount,
    defaultCount,
    defaultTerm,
    defaultTermUnit,
    startAt,
    endAt,
  } = ticket;

  console.log(ticket);

  return (
    <>
      <TS.Ticket $isActive={isActive}>
        <TS.TicketLeft className="ticket-left" style={{ padding: '1.2rem' }}>
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
            {/* 본인 데이터에 맞는 목록 추가 */}
            <dl>
              <dt>수강권 횟수</dt>
              <dd>{`${defaultCount}회`}</dd>
            </dl>
            <dl>
              <dt>서비스 횟수</dt>
              <dd>{`${serviceCount}회`}</dd>
            </dl>
            <dl>
              <dt>수강권 기간</dt>
              <dd>{`${defaultTerm}${TermUnitEnum[defaultTermUnit]}`}</dd>
            </dl>
            <dl style={{ display: 'flex' }}>
              <dt>유효 기간</dt>
              <dd style={{ display: 'flex' }}>{`${startAt.replace(/-/gi, '.')}~${endAt.replace(/-/gi, '.')}`}</dd>
            </dl>
          </TS.LeftInfo>
        </TS.TicketLeft>
        <TS.TicketRight className="ticket-right">
          {/* 각각 버튼에 맞는 행동 추가 */}
          <button
            type="button"
            onClick={() => {
              setTicketData();
            }}
          >
            상세보기
          </button>
          {isActive ? (
            <button
              type="button"
              onClick={() => {
                console.log(id + ' 판매종료 클릭');
              }}
            >
              수강권 일시중단
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  console.log(id + ' 판매가능 클릭');
                }}
              >
                수강권 재진행
              </button>
            </>
          )}
          <button type="button" onClick={() => {}}>
            환불
          </button>
        </TS.TicketRight>
      </TS.Ticket>
    </>
  );
};

import { useState, memo } from 'react';

import { LessonTypeEnum, TermUnitEnum, Ticket_response } from '@apis/ticketsAPIs';
import { TicketIcon } from '@assets/icons/indexIcons';
import { IssuedTicketModal } from '@components/center/ticket/IssuedTicketModal';
import { TS } from '@styles/center/ticketsStyle';

interface TicketItemProps {
  ticket: Ticket_response;
}

const TicketItemMemo = ({
  ticket,
  setTicketData,
  suspendTicketFunc,
  unsuspendTicketFunc,
  refundTicketFunc,
}: TicketItemProps) => {
  const {
    id,
    title,
    lessonType,
    isSuspended,
    serviceCount,
    isCanceled,
    defaultCount,
    defaultTerm,
    defaultTermUnit,
    startAt,
    endAt,
  } = ticket;
  const [isOpen, setIsOpen] = useState(false);

  console.log(ticket);

  return (
    <>
      <TS.Ticket $isActive={!isSuspended && !isCanceled}>
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
              <dd>{defaultCount ? `${defaultCount}회` : '무제한'}</dd>
            </dl>
            <dl>
              <dt>서비스 횟수</dt>
              <dd>{serviceCount ? `${serviceCount}회` : '무제한'}</dd>
            </dl>
            {/* "새로운" <- 데이터 보고 고치기 */}
            {/* <dl>
              <dt>수강권 기간</dt>
              <dd>{`${defaultTerm}${TermUnitEnum[defaultTermUnit]}`}</dd>
            </dl> */}
            <dl style={{ display: 'flex' }}>
              <dt>유효 기간</dt>
              <dd style={{ display: 'flex' }}>{`${startAt.replace(/-/gi, '.')}~${endAt.replace(/-/gi, '.')}`}</dd>
            </dl>
          </TS.LeftInfo>
        </TS.TicketLeft>
        <TS.TicketRight className="ticket-right">
          {/* 각각 버튼에 맞는 행동 추가 */}
          <button
            disabled={isCanceled ? true : false}
            type="button"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            {isCanceled ? '-' : '상세보기'}
          </button>

          {!isSuspended ? (
            <button
              disabled={isCanceled ? true : false}
              type="button"
              onClick={() => {
                suspendTicketFunc();
              }}
            >
              {isCanceled ? '-' : '수강권 일시중단'}
            </button>
          ) : (
            <button
              disabled={isCanceled ? true : false}
              type="button"
              onClick={() => {
                unsuspendTicketFunc();
              }}
            >
              {isCanceled ? '-' : '수강권 재진행'}
            </button>
          )}
          <button
            disabled={isCanceled ? true : false}
            type="button"
            onClick={() => {
              refundTicketFunc();
            }}
          >
            {!isCanceled ? '환불' : '환불 완료'}
          </button>
        </TS.TicketRight>
      </TS.Ticket>
      {isOpen && <IssuedTicketModal issuedId={id} setIsOpen={setIsOpen} />}
    </>
  );
};

export const TicketItem = memo(TicketItemMemo);

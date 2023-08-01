import { useNavigate } from 'react-router-dom';

import { LessonTypeEnum, TermUnitEnum, Ticket_response } from '@apis/ticketsAPIs';
import { TicketIcon } from '@assets/icons/indexIcons';
import { Button } from '@components/common/Button';
import { TS } from '@styles/center/ticketsStyle';

import { type } from './Form/TicketFormComponent';

interface TicketItemProps {
  ticket: Ticket_response;
  btnTexts: any;
  setTicketData: () => void;
}

export const TicketItem = ({ ticket, btnTexts = {}, setTicketData }: TicketItemProps) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    lessonType,
    isActive = true,
    issuedTicketCount,
    defaultCount,
    defaultTerm,
    defaultTermUnit,
    bookableLessons = '',
  } = ticket;

  const duration = bookableLessons[0]?.duration;
  const { btnDetail, btnSuspens, btnEdit } = btnTexts;

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
              <TicketIcon />
            </div>
          </TS.LeftTitle>
          <TS.LeftInfo>
            {issuedTicketCount && (
              <dl>
                <dt>부여</dt>
                <dd>{`${issuedTicketCount}건`}</dd>
              </dl>
            )}
            <dl>
              <dt>수강권 횟수</dt>
              <dd>{defaultCount ? `${defaultCount}회` : '무제한'}</dd>
            </dl>
            {duration && (
              <dl>
                <dt>수업 시간</dt>
                <dd>{`${duration}분`}</dd>
              </dl>
            )}
            <dl>
              <dt>수강권 기간</dt>
              <dd>
                {defaultTerm && defaultTermUnit ? `${defaultTerm}${TermUnitEnum[defaultTermUnit]}` : '소진시 까지'}
              </dd>
            </dl>
          </TS.LeftInfo>
        </TS.TicketLeft>
        <TS.TicketRight className="ticket-right">
          {/* 각각 버튼에 맞는 행동 추가 */}
          {btnDetail ? (
            <button type="button" onClick={() => {}}>
              {btnDetail}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                navigate(`/center/tickets/${id}/issued-tickets`);
              }}
            >
              수강권 부여내역
            </button>
          )}

          {btnSuspens && <button onClick={() => {}}>{btnSuspens}</button>}

          {!btnEdit &&
            (isActive ? (
              <button
                type="button"
                onClick={() => {
                  console.log(id + ' 판매종료 클릭');
                }}
              >
                판매종료
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    console.log(id + ' 판매가능 클릭');
                  }}
                >
                  판매가능
                </button>
              </>
            ))}

          {btnEdit ? (
            <button
              onClick={() => {
                setTicketData();
              }}
            >
              {btnEdit}
            </button>
          ) : (
            <button type="button" onClick={() => {}}>
              수정 / 삭제
            </button>
          )}
        </TS.TicketRight>
      </TS.Ticket>
    </>
  );
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LessonTypeEnum, TermUnitEnum, Ticket_response } from '@apis/ticketsAPIs';
import { TicketIcon } from '@assets/icons/indexIcons';
import { Modal, ModalButton } from '@components/common/Modal';
import { TS } from '@styles/center/ticketsStyle';

interface TicketItemProps {
  ticket: Ticket_response;
  ticketStatus: (id: number) => void;
}
export const TicketItem = ({ ticket, ticketStatus }: TicketItemProps) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    lessonType,
    isActive,
    issuedTicketCount,
    defaultCount,
    defaultTerm,
    defaultTermUnit,
    bookableLessons,
  } = ticket;

  const duration = bookableLessons[0].duration;
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <TS.TicketRight className="ticket-right">
          {/* 각각 버튼에 맞는 행동 추가 */}
          <button
            type="button"
            onClick={() => {
              navigate(`${id}/issued-tickets`);
            }}
          >
            수강권 부여내역
          </button>

          {isActive ? (
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                setIsModalOpen(true);
                console.log(id + ' 판매종료 클릭');
              }}
            >
              판매종료
            </button>
          ) : (
            <>
              {' '}
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  ticketStatus(id);
                  navigate(`?isActive=true`);
                  console.log(id + ' 판매가능 클릭');
                }}
              >
                판매가능
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => {
              navigate(`${id}/edit`);
            }}
          >
            수정 / 삭제
          </button>
        </TS.TicketRight>
      </TS.Ticket>

      {isModalOpen && (
        <Modal setIsOpen={setIsModalOpen}>
          <h3>수강권 판매 종료</h3>
          <p>
            해당 수강권을 판매 종료하시겠습니까?
            <br />
            새로운 회원에게 부여할 수 없습니다.
          </p>
          <div className="buttonWrapper">
            <ModalButton
              onClick={() => {
                ticketStatus(id);
                navigate(`?isActive=false`);
                setIsModalOpen(false);
              }}
              $isPrimary
            >
              확인
            </ModalButton>
            <ModalButton onClick={() => setIsModalOpen(false)}>취소</ModalButton>
          </div>
        </Modal>
      )}
    </>
  );
};

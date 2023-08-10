import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LessonTypeEnum, TermUnitEnum, TicketListResponse } from '@apis/types/ticketsTypes';
import { TicketIcon } from '@assets/icons/indexIcons';
import { Modal } from '@components/common/Modal';
import { TS } from '@styles/common/ticketsStyle';
import { ModalButton } from '@styles/modal/modalStyle';

interface TicketItemProps {
  ticket: TicketListResponse;
  ticketStatus: (id: number) => void;
  deleteTicket: (id: number) => void;
}
export const TicketItem = ({ ticket, ticketStatus, deleteTicket }: TicketItemProps) => {
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCannotDeleteModalOpen, setIsCannotDeleteModalOpen] = useState(false);

  const handleDelete = async (ticketId: number) => {
    if (issuedTicketCount !== 0) {
      setIsCannotDeleteModalOpen(true);
      setIsDeleteModalOpen(false);
      return;
    }
    await deleteTicket(ticketId);
    setIsDeleteModalOpen(false);
  };

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
            수정
          </button>
          <button
            type="button"
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
          >
            삭제
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
              $isPrimary
              onClick={() => {
                ticketStatus(id);
                navigate(`?isActive=false`);
                setIsModalOpen(false);
              }}
            >
              확인
            </ModalButton>
            <ModalButton onClick={() => setIsModalOpen(false)}>취소</ModalButton>
          </div>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal setIsOpen={setIsDeleteModalOpen}>
          <h3>수강권 삭제</h3>
          <p>수강권을 삭제하시겠습니까?</p>
          <div className="buttonWrapper">
            <ModalButton $isPrimary onClick={() => handleDelete(id)}>
              확인
            </ModalButton>
            <ModalButton onClick={() => setIsDeleteModalOpen(false)}>취소</ModalButton>
          </div>
        </Modal>
      )}

      {isCannotDeleteModalOpen && (
        <Modal setIsOpen={setIsCannotDeleteModalOpen}>
          <h3>삭제 불가</h3>
          <p>
            부여내역이 있는 수강권은 <br />
            삭제할 수 없습니다.
            <br />
            판매 종료로 진행해 주세요.
          </p>
          <div className="buttonWrapper">
            <ModalButton onClick={() => setIsCannotDeleteModalOpen(false)}>확인</ModalButton>
          </div>
        </Modal>
      )}
    </>
  );
};

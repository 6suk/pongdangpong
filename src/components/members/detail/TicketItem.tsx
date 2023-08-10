import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { mutate } from 'swr';

import { MemberIssuedTicketType } from '@apis/types/membersTypes';
import { LessonTypeEnum } from '@apis/types/ticketsTypes';
import { TicketIcon } from '@assets/icons/indexIcons';
import { NoticeModal } from '@components/common/NoticeModal';
import { IssuedTicketDetailModal } from '@components/issuedTickets/IssuedTicketDetailModal';
import { useRequests } from '@hooks/apis/useRequests';
import { useErrorModal } from '@hooks/utils/useErrorModal';
import { TS } from '@styles/common/ticketsStyle';
import { extractDate, formatTimestampDot } from '@utils/schedules/formatTimestamp';

interface TicketItemProps {
  ticket: MemberIssuedTicketType;
}
export const TicketItem = ({ ticket }: TicketItemProps) => {
  const { memberId } = useParams();
  const { pathname } = useLocation();
  const {
    id,
    title,
    lessonType,
    defaultCount,
    isSuspended,
    serviceCount,
    startAt,
    endAt,
    isCanceled,
    suspendedAt,
    canceledAt,
  } = ticket;
  const { isErrorModalOpen, errorModal, handleModalNotice, closeErrorModal } = useErrorModal();
  const [isMoreViewOpen, setIsMoreViewOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { request } = useRequests();
  const mutatePath = pathname.replace('/', '');

  const ticketAction = async (url: string, title: string, content: string) => {
    try {
      await request({
        method: 'post',
        url: `issued-tickets/${ticket.id}`,
        path: `/${url}`,
      });
      handleModalNotice(title, content);
      setIsCompleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isCompleted && !isErrorModalOpen) {
      mutate(`${mutatePath}/issued-tickets`);
    }
  }, [isCompleted, isErrorModalOpen]);

  return (
    <>
      <TS.Ticket $isActive={!isSuspended && !isCanceled}>
        <TS.TicketLeft className="ticket-left">
          <TS.LeftTitle>
            <div className="title">
              <h3>{title}</h3>
              <div className="tagBox">
                <p className="tag">{LessonTypeEnum[lessonType]}</p>
                <p className="cancel">
                  {isCanceled && <span>{formatTimestampDot(canceledAt)} 환불</span>}
                  {isSuspended && <span>{formatTimestampDot(suspendedAt)} 일시중단</span>}
                </p>
              </div>
            </div>
            <div className="icon">
              <TicketIcon />
            </div>
          </TS.LeftTitle>
          <TS.LeftInfo className="member">
            <dl>
              <dt>기본 횟수</dt>
              <dd>{defaultCount ? `${defaultCount}건` : '무제한'}</dd>
            </dl>
            <dl>
              <dt>서비스 횟수</dt>
              <dd>{`${serviceCount || 0}회`}</dd>
            </dl>
            <dl>
              <dt>유효기간</dt>
              <dd>{`${extractDate(startAt)} - ${extractDate(endAt)}`}</dd>
            </dl>
          </TS.LeftInfo>
        </TS.TicketLeft>
        <TS.TicketRight className="ticket-right">
          {/* 각각 버튼에 맞는 행동 추가 */}
          <button
            type="button"
            onClick={() => {
              setIsMoreViewOpen(true);
            }}
          >
            상세보기
          </button>

          {isSuspended && (
            <>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  ticketAction(
                    `unsuspend`,
                    `티켓 일시 중지 해제`,
                    `${ticket.title} 티켓이 일시중지가 해제 되었습니다.`
                  );
                }}
              >
                일시중단 해제
              </button>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  ticketAction(`refund`, `티켓 환불`, `${ticket.title} 티켓이 환불 되었습니다.`);
                }}
              >
                환불
              </button>
            </>
          )}

          {isCanceled && (
            <>
              <button disabled type="button">
                -
              </button>
              <button disabled type="button">
                -
              </button>
            </>
          )}

          {!isCanceled && !isSuspended && (
            <>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  ticketAction(`suspend`, `티켓 일시 중지`, `${ticket.title} 티켓이 일시중지 되었습니다.`);
                }}
              >
                수강권 일시중단
              </button>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  ticketAction(`refund`, `티켓 환불`, `${ticket.title} 티켓이 환불 되었습니다.`);
                }}
              >
                환불
              </button>
            </>
          )}
        </TS.TicketRight>
      </TS.Ticket>

      {isMoreViewOpen && memberId && (
        <IssuedTicketDetailModal issuedId={id} memberId={parseInt(memberId)} setIsOpen={setIsMoreViewOpen} />
      )}
      {isErrorModalOpen && <NoticeModal innerNotice={errorModal} setIsOpen={closeErrorModal} />}
    </>
  );
};

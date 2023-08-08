import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Schedules_detail_private } from '@apis/schedulesAPIs';
import { BackIcon } from '@assets/icons/indexIcons';
import { NoticeModal } from '@components/common/NoticeModal';
import { useSwrData } from '@hooks/apis/useSwrData';

import { BackButton, DetailButton } from '@styles/common/buttonStyle';
import { TicketWrap } from '@styles/common/ticketsStyle';
import { DetailWrap } from '@styles/common/wrapStyle';
import { MemoPreview, MoreButton, SchedulesInfoBar } from '@styles/pages/SchedulesStyle';
import { formatDate, formatTimeRange, formatTimestamp } from '@utils/schedules/formatTimestamp';

import { MemberCardItem } from './MemberCardItem';
import { SchedulesCancelModal } from './SchedulesCancelModal';

export const PrivateLessonDetail = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data, isLoading } = useSwrData(pathname);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const { createdAt, createdBy, startAt, endAt, attendanceHistories, tutor, issuedTicket, memo } =
    (data as Schedules_detail_private) || {};
  const membersCount = attendanceHistories?.length || '0';
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);

  return (
    !isLoading && (
      <>
        <DetailWrap>
          <div>
            <div className="header">
              <div className="title">
                <h3>수업 정보</h3>
                <p className="createdAt">
                  생성일 {formatTimestamp(createdAt)} {createdBy.name}
                </p>
              </div>
              <BackButton onClick={() => navigate('/schedules')}>
                <BackIcon />
                <p>뒤로가기</p>
              </BackButton>
            </div>
            <SchedulesInfoBar>
              <div className="infos">
                <dl>
                  <dt>일정</dt>
                  <dd>{formatDate(startAt)}</dd>
                </dl>
                <dl>
                  <dt>시간</dt>
                  <dd>{formatTimeRange(startAt, endAt)}</dd>
                </dl>
                <dl>
                  <dt>정원</dt>
                  <dd>{membersCount}명</dd>
                </dl>
                <dl>
                  <dt>강사</dt>
                  <dd>{tutor.name}</dd>
                </dl>
                <dl>
                  <dt>메모</dt>
                  <dd>
                    <MemoPreview>
                      {memo ? memo.substring(0, 5) + (memo.length > 5 ? '...' : '') : '-'}
                      {memo && memo.length > 5 && (
                        <MoreButton
                          onClick={() => {
                            setIsMemoModalOpen(true);
                          }}
                        >
                          더보기
                        </MoreButton>
                      )}
                    </MemoPreview>
                  </dd>
                </dl>
              </div>
              <div className="btns">
                <DetailButton
                  className="pri"
                  onClick={() => {
                    navigate('edit');
                  }}
                >
                  변경
                </DetailButton>
                <DetailButton
                  onClick={() => {
                    setIsOpenCancelModal(true);
                  }}
                >
                  취소
                </DetailButton>
              </div>
            </SchedulesInfoBar>
          </div>
          <div>
            <div className="header">
              <div className="title">
                <h3>참여회원(1)</h3>
              </div>
            </div>
            <TicketWrap>
              <MemberCardItem attendanceHistories={attendanceHistories} issuedTicket={issuedTicket} />
            </TicketWrap>
          </div>
        </DetailWrap>

        {/* 메모 더보기 모달 */}
        {isMemoModalOpen && (
          <NoticeModal innerNotice={{ title: '메모', content: memo }} setIsOpen={setIsMemoModalOpen} />
        )}

        {/* 상담 취소 컨펌 및 진행 모달 */}
        {isOpenCancelModal && <SchedulesCancelModal setIsOpen={setIsOpenCancelModal} type="counselling" />}
      </>
    )
  );
};

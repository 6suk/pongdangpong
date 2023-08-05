import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

import { Schedules_detail_private } from '@apis/schedulesAPIs';
import { BackIcon } from '@assets/icons/indexIcons';
import { BackButton, DetailButton } from '@components/center/ticket/TicketIssued';
import { NoticeModal } from '@components/common/NoticeModal';
import { useSwrData } from '@hooks/apis/useSwrData';

import { TicketWrap } from '@styles/center/ticketsStyle';
import theme from '@styles/theme';
import { formatDate, formatTimeRange, formatTimestamp } from '@utils/formatTimestamp';

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
        <SchedulesDetailWrap>
          <div>
            <div className="header">
              <div className="title">
                <h3>수업 정보</h3>
                <p className="createdAt">
                  생성일 {formatTimestamp(createdAt)} {createdBy.name}
                </p>
              </div>
              <BackButton onClick={() => navigate(-1)}>
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
        </SchedulesDetailWrap>

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

const MemoPreview = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const MoreButton = styled.span`
  padding-inline: 0.3rem;
  padding-block: 0.1rem;
  border: 1px solid ${theme.colors.gray[700]};
  color: ${theme.colors.gray[500]};
  border-radius: 6px;
  cursor: pointer;
  margin-left: 7px;
  font-size: ${theme.font.sm};
`;

export const SchedulesDetailWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 1024px;

  .memo {
    font-size: 16px;
    margin-inline: 1rem;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid ${theme.colors.gray[800]};
    min-height: 100px;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    margin-inline: 1rem;
    justify-content: space-between;

    .title {
      display: flex;
      align-items: center;
    }

    h3 {
      font-size: ${theme.font.subTitle};
      font-weight: 800;

      &.number {
        color: ${theme.colors.pri[500]};
        margin-left: 0.5rem;
      }
    }

    .createdAt {
      font-size: ${theme.font.sm};
      color: ${theme.colors.gray[500]};
      font-weight: 300;
      margin-left: 1rem;
      letter-spacing: 0.5px;
    }
    .btns {
      display: flex;
      gap: 1rem;
      button {
        font-size: 14px;
        transition: all 0.4s;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
`;

export const SchedulesInfoBar = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-inline: 1.5rem;
  border: 1px solid ${theme.colors.gray[800]};
  text-align: left;
  border-radius: 6px;
  font-size: 15px;
  justify-content: space-between;

  .btns {
    display: flex;
    gap: 0.5rem;
    button {
      width: 80px;
    }
  }

  .infos {
    display: flex;
    gap: 3rem;
    align-items: center;
    font-size: ${theme.font.subBody};

    dl {
      display: flex;
      gap: 0.5rem;
      align-items: center;
}

      dt {
        font-weight: 600;
      }
    }
  }

  &.title > p {
    font-weight: 600;
  }

  &.title {
    border: none;
    padding-block: 0;
  }

  .icon-box {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 600;

    svg {
      width: 30px;
    }
  }

  p {
    transition: all 0.4s;
  }

  .inactive {
    color: ${props => props.theme.colors.Error};
  }
`;

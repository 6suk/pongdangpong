import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

import { Schedules_detail_counseling } from '@apis/schedulesAPIs';
import { BackIcon, MemberIcon } from '@assets/icons/indexIcons';
import { BackButton, DetailButton } from '@components/center/ticket/TicketIssued';
import { NoticeModal } from '@components/common/NoticeModal';
import { useSwrData } from '@hooks/apis/useSwrData';

import { useErrorModal } from '@hooks/utils/useErrorModal';
import { TicketWrap } from '@styles/center/ticketsStyle';
import { SC } from '@styles/styles';
import theme from '@styles/theme';
import { formatDate, formatTimeRange, formatTimestamp } from '@utils/formatTimestamp';

import { CounselingRecordFormModal } from './CounselingRecordFormModal';
import { SchedulesCancelModal } from './SchedulesCancelModal';

export const CounselingDetail = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data, isLoading } = useSwrData(pathname);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const { createdAt, createdBy, startAt, endAt, memo, counselor, client, counselingRecord } =
    (data as Schedules_detail_counseling) || {};
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const { isErrorModalOpen, closeErrorModal, handleModalNotice, errorModal } = useErrorModal();

  return (
    !isLoading && (
      <>
        <SchedulesDetailWrap>
          <div>
            <div className="header">
              <div className="title">
                <h3>상담 정보</h3>
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
                  <dt>강사</dt>
                  <dd>{counselor.name}</dd>
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
          <TicketWrap style={{ minHeight: '400px' }}>
            <CounselingInfoWrap>
              <div>
                <div className="header sub">
                  <div className="title">
                    <h3>상담 회원</h3>
                  </div>
                </div>
                <CardItem>
                  <div className="card-top">
                    <div className="top-left">
                      <MemberIcon />
                      <div className="name-box">
                        <p className="name">{client.name}</p>
                        <p>{client.phone}</p>
                      </div>
                    </div>
                    <div className="top-btns">
                      <button
                        type="button"
                        onClick={() => {
                          setIsRecordOpen(true);
                        }}
                      >
                        상담기록
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          navigate('/members/register');
                        }}
                      >
                        회원 정보 등록
                      </button>
                    </div>
                  </div>
                </CardItem>
              </div>
              <div style={{ height: '100%' }}>
                <div className="header sub">
                  <div className="title">
                    <h3>일정 메모</h3>
                  </div>
                </div>
                <SC.TextareaField readOnly style={{ height: '100%' }} value={memo || '-'} />
              </div>
            </CounselingInfoWrap>
            <CounselingInfoWrap>
              <div style={{ height: '100%' }}>
                <div className="header sub">
                  <div className="title">
                    <h3>상담 기록</h3>
                  </div>
                </div>
                <SC.TextareaField
                  readOnly
                  disabled={counselingRecord?.content ? false : true}
                  style={{ height: '100%' }}
                  value={counselingRecord?.content || '상담 기록을 작성해 주세요.'}
                />
              </div>
            </CounselingInfoWrap>
          </TicketWrap>
        </SchedulesDetailWrap>

        {/* 상담기록 등록 모달 */}
        {isRecordOpen && (
          <CounselingRecordFormModal
            data={data as Schedules_detail_counseling}
            handleModalNotice={handleModalNotice}
            setIsOpen={setIsRecordOpen}
          />
        )}

        {/* 상담기록 Notice 모달 */}
        {isErrorModalOpen && <NoticeModal innerNotice={errorModal} setIsOpen={closeErrorModal} />}

        {/* 상담 취소 컨펌 및 진행 모달 */}
        {isOpenCancelModal && <SchedulesCancelModal setIsOpen={setIsOpenCancelModal} type="counselling" />}
      </>
    )
  );
};

const CounselingInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;

  textarea {
    padding-inline: 1.5rem;
    padding-block: 1.25rem;
  }
`;

const CardItem = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${theme.colors.gray[700]};
  border-radius: 10px;
  overflow: hidden;
  font-size: ${theme.font.sub};

  .card-top {
    padding-inline: 1.5rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-block: 1.25rem;
    flex: 3;
    align-items: center;

    .top-left {
      display: flex;
      align-items: flex-start;
      gap: 0.8rem;

      svg {
        width: 1.8rem;
      }

      .name-box {
        display: flex;
        flex-direction: column;

        .name {
          font-weight: 600;
          /* font-size: ${theme.font.body}; */
        }
      }
    }
    .top-btns {
      display: flex;
      gap: 0.25rem;

      button {
        font-size: ${theme.font.sub};
        border: 1px solid ${theme.colors.gray[700]};
        color: ${theme.colors.pri[600]};
        padding-block: 0.3rem;
        padding-inline: 0.6rem;
        border-radius: 8px;
        transition: all 0.4s;

        &:hover {
          font-weight: 600;
          background-color: ${theme.colors.gray[900]};
        }
      }
    }
  }
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

    &.sub {
      margin-inline: 0.5rem;
      h3 {
        /* font-size: ${theme.font.body}; */
      }
    }

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

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Schedules_detail_counseling } from '@apis/schedulesAPIs';
import { BackIcon, MemberIcon } from '@assets/icons/indexIcons';
import { BackButton, DetailButton } from '@components/center/ticket/TicketIssued';
import { NoticeModal } from '@components/common/NoticeModal';
import { useSwrData } from '@hooks/apis/useSwrData';

import { useErrorModal } from '@hooks/utils/useErrorModal';
import { TicketWrap } from '@styles/center/ticketsStyle';
import { CounselingCardItem, CounselingInfoWrap, SchedulesDetailWrap, SchedulesInfoBar } from '@styles/SchedulesStyle';
import { SC } from '@styles/styles';
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
                <CounselingCardItem>
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
                </CounselingCardItem>
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

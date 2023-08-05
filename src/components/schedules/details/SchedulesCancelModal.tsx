import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Modal, ModalButton } from '@components/common/Modal';
import { NoticeModal } from '@components/common/NoticeModal';
import { useRequests } from '@hooks/apis/useRequests';

interface SchedulesCancelModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'counselling' | 'private';
}

const content = {
  counselling: {
    title: '상담 일정 취소',
    content: '상담 일정을 취소하시겠습니까?',
    notice: {
      title: '상담 일정 취소',
      content: '상담 일정 취소가 완료 되었습니다.',
    },
  },
  private: {
    title: '수업 일정 취소',
    content: '취소를 진행하시겠습니까?\n취소는 차감된 횟수가 복구됩니다.\n* 주의 : 일정 내용 복구 불가',
    notice: {
      title: '수업 일정 취소',
      content: '수업 일정 취소가 완료 되었습니다.',
    },
  },
};

export const SchedulesCancelModal = ({ setIsOpen, type }: SchedulesCancelModalProps) => {
  const { request } = useRequests();
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const handleCancel = async () => {
    await request({
      method: `post`,
      url: `schedules`,
      path: `/${scheduleId}/cancel`,
    });
    setIsNoticeOpen(true);
  };

  const handleNoticeCancelClick = () => {
    navigate('/schedules');
  };

  return (
    <>
      <Modal setIsOpen={setIsOpen}>
        <h3>{content[type].title}</h3>
        <p>{content[type].content}</p>
        <div className="buttonWrapper">
          <ModalButton
            onClick={() => {
              setIsOpen(false);
            }}
          >
            아니요
          </ModalButton>
          <ModalButton $isPrimary onClick={handleCancel}>
            예
          </ModalButton>
        </div>
      </Modal>
      {isNoticeOpen && (
        <NoticeModal innerNotice={content[type].notice} setIsOpen={setIsNoticeOpen} onClick={handleNoticeCancelClick} />
      )}
    </>
  );
};

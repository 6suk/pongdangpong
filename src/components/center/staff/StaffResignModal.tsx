import { Dispatch, SetStateAction } from 'react';

import { Modal, ModalButton } from '@components/common/Modal';
import { useRequests } from '@hooks/apis/useRequests';
import { useSwrData } from '@hooks/apis/useSwrData';

interface StaffsResignModalProps {
  setActive: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsConfirmModalOpen: Dispatch<SetStateAction<boolean>>;
  id: string | number;
  name: string;
}

interface StaffsConfirmModalProps {
  setIsConfirmModalOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
}

export const StaffsResignModal: React.FC<StaffsResignModalProps> = ({
  setActive,
  setIsOpen,
  setIsConfirmModalOpen,
  id,
  name,
}) => {
  const { data, isLoading } = useSwrData(`staffs/${id}`);
  const { request } = useRequests();

  const onConfirm = async () => {
    try {
      const response = await request({
        url: `staffs/${id}/resign`,
        method: 'post',
      });

      if (response) {
        setActive(false);
        setIsOpen(false);
        setIsConfirmModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    !isLoading && (
      <Modal setIsOpen={setIsOpen}>
        <h3>
          {name}님을
          <br />
          퇴사 처리하시겠습니까?
        </h3>
        <p>퇴사 후, {name}님의 정보는 조회만 가능합니다.</p>
        <div className="buttonWrapper">
          <ModalButton onClick={onConfirm} $isPrimary>
            예
          </ModalButton>
          <ModalButton
            onClick={() => {
              setIsOpen(false);
              console.log({ id });
            }}
          >
            아니오
          </ModalButton>
        </div>
      </Modal>
    )
  );
};

export const StaffsConfirmModal: React.FC<StaffsConfirmModalProps> = ({ setIsConfirmModalOpen, name }) => {
  return (
    <Modal setIsOpen={setIsConfirmModalOpen}>
      <p>[{name}] 퇴사 처리 완료</p>
      <ModalButton
        onClick={() => {
          setIsConfirmModalOpen(false);
        }}
      >
        확인
      </ModalButton>
    </Modal>
  );
};

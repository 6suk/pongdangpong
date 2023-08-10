import { useNavigate } from 'react-router-dom';

import { TicketFormComponent, TicketFormDataType } from '@components/center/ticket/TicketFormComponent';
import { NoticeModal } from '@components/common/NoticeModal';
import { useRequests } from '@hooks/apis/useRequests';
import { useErrorModal } from '@hooks/utils/useErrorModal';

export interface ValidationErrors {
  [key: string]: boolean;
}

export const TicketForm = () => {
  const navigate = useNavigate();
  const { request } = useRequests();
  const { closeErrorModal, errorModal, handleAxiosError, isErrorModalOpen } = useErrorModal();

  const onSubmit = async (data: TicketFormDataType) => {
    try {
      await request({
        url: `tickets`,
        method: 'post',
        body: data,
      });
      navigate('/center/tickets');
    } catch (error) {
      handleAxiosError(error, `티켓 등록 오류`);
    }
  };

  return (
    <>
      <TicketFormComponent onSubmit={onSubmit} />
      {isErrorModalOpen && <NoticeModal innerNotice={errorModal} setIsOpen={closeErrorModal} />}
    </>
  );
};

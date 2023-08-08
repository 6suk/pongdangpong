import { Dispatch, SetStateAction, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { LessonTypeEnum, TermUnitEnum, Ticket_issued_detail_res } from '@apis/ticketsAPIs';
import { MemberIcon } from '@assets/icons/indexIcons';
import { Button } from '@components/common/Button';
import { Loading } from '@components/common/Loading';
import { Modal } from '@components/common/Modal';
import { useSwrData } from '@hooks/apis/useSwrData';
import { ModalInfoStyle, ModalInfoTop } from '@styles/modal/modalStyle';

interface IssuedTicketDetailProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  issuedId: number;
  memberId: number;
}

export const IssuedTicketDetailModal = ({ setIsOpen, issuedId, memberId }: IssuedTicketDetailProps) => {
  const { data, isLoading } = useSwrData<Ticket_issued_detail_res>(`issued-tickets/${issuedId}`);
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);
  const navigate = useNavigate();

  if (isLoading && !data) {
    return <Loading />;
  } else {
    return (
      <>
        <Modal maxWidth="36rem" setIsOpen={setIsOpen}>
          {data && (
            <>
              <ModalInfoTop>
                <h3 className="modal-info-title">{data.title}</h3>
                <p className="modal-tag">{LessonTypeEnum[data.lessonType as keyof typeof LessonTypeEnum]}</p>
              </ModalInfoTop>
              <InformationList data={data} />

              <div className="buttonWrapper">
                <Button isPri={false} size="full" onClick={handleClose}>
                  닫기
                </Button>
                <Button size="full" onClick={() => navigate(`/members/${memberId}/tickets/${issuedId}/edit`)}>
                  편집
                </Button>
              </div>
            </>
          )}
        </Modal>
      </>
    );
  }
};

const InformationList = ({ data }: { data: Ticket_issued_detail_res }) => {
  const {
    defaultCount,
    serviceCount,
    remainingCount,
    availableReservationCount,
    defaultTerm,
    defaultTermUnit,
    startAt,
    endAt,
    privateTutor,
  } = data;

  return (
    <ModalInfoStyle>
      <dl>
        <dt>기본 횟수</dt>
        <dd>{defaultCount ? defaultCount + '회' : '무제한'}</dd>
      </dl>
      <dl>
        <dt>서비스 횟수</dt>
        <dd>{serviceCount || 0}회</dd>
      </dl>
      <dl>
        <dt>잔여 횟수</dt>
        <dd>{remainingCount || 0}회</dd>
      </dl>
      <dl>
        <dt>예약 가능 잔여 횟수</dt>
        <dd>{availableReservationCount || 0}회</dd>
      </dl>
      <dl>
        <dt>수강권 기간</dt>
        <dd>{defaultTerm && defaultTermUnit ? defaultTerm + TermUnitEnum[defaultTermUnit] : '소진시까지'}</dd>
      </dl>
      <dl>
        <dt>유효 기간</dt>
        <dd>{`${startAt} - ${endAt}`}</dd>
      </dl>
      <dl>
        <dt>담당 강사</dt>
        <dd>
          <MemberIcon /> {privateTutor?.name}
        </dd>
      </dl>
    </ModalInfoStyle>
  );
};

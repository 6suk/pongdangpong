import { Dispatch, SetStateAction, useCallback, memo } from 'react';

import { styled } from 'styled-components';

import { LessonTypeEnum, TermUnitEnum, Ticket_issued_detail_res } from '@apis/ticketsAPIs';
import { MemberIcon } from '@assets/icons/indexIcons';
import { Button } from '@components/common/Button';
import { Loading } from '@components/common/Loading';
import { Modal } from '@components/common/Modal';
import { useSwrData } from '@hooks/apis/useSwrData';
import theme from '@styles/theme';

interface IssuedTicketDetailProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  issuedId: number;
}

export const IssuedTicketModal = ({ setIsOpen, issuedId }: IssuedTicketDetailProps) => {
  const { data, isLoading } = useSwrData(`issued-tickets/${issuedId}`);
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  if (isLoading && !data) {
    return <Loading />;
  } else {
    return (
      <>
        <Modal maxWidth="36rem" setIsOpen={setIsOpen}>
          <ModalInfoTop>
            <h3 className="modal-info-title">{data.title}</h3>
            <p className="modal-tag">{LessonTypeEnum[data.lessonType as keyof typeof LessonTypeEnum]}</p>
          </ModalInfoTop>
          <InformationList data={data} />

          <div className="buttonWrapper">
            <Button isPri={false} size="full" onClick={handleClose}>
              닫기
            </Button>
            <Button size="full" onClick={handleClose}>
              편집
            </Button>
          </div>
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

const ModalInfoTop = styled.div`
  margin-top: 1.5rem;
  margin-inline: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .modal-tag {
    font-size: ${theme.font.sub};
    color: ${theme.colors.pri[500]};
    background-color: ${theme.colors.pri[900]};
    padding-inline: 0.6rem;
    padding-block: 0.3rem;
    border-radius: 6px;
    width: fit-content;
    margin-bottom: 0;
  }

  .modal-info-title {
    text-align: left;
    font-size: ${theme.font.subTitle};
    margin-bottom: 0;
  }
`;

const ModalInfoStyle = styled.div`
  display: grid;
  gap: 10px;
  margin-bottom: 2rem;
  margin-top: 2rem;
  text-align: left;

  dt {
    color: ${theme.colors.gray[500]};
  }

  dl {
    display: grid;
    grid-template-columns: 3fr 7fr;
    padding: 1rem;
    border-bottom: 1px solid ${theme.colors.gray[800]};
    column-gap: 2.5rem;
    font-size: 15px;
  }
  dl:first-child {
    border-top: 1px solid ${theme.colors.gray[800]};
  }

  dd {
    display: flex;
    gap: 0.5rem;

    svg {
      width: 24px;
      height: auto;
    }
  }
`;

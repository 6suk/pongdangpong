import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { styled } from 'styled-components';

import { Ticket_issued_list_datas } from '@apis/ticketsAPIs';
import { BackIcon, MemberIcon } from '@assets/icons/indexIcons';
import { useSwrData } from '@hooks/apis/useSwrData';

import { TicketContainer, Top } from '@styles/center/ticketsStyle';
import theme from '@styles/theme';

import { IssuedTicketModal } from './IssuedTicketModal';

export const TicketIssued = () => {
  const { id } = useParams();
  const location = useLocation();
  const { data } = useSwrData(location.pathname.replace('/center/', '')); // 수강권 부여 리스트
  const { data: ticketData, isLoading } = useSwrData(`tickets/${id}`); // 해당 수강권 정보
  const [issuedId, setIssuedId] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const {
    datas,
    meta: { totalCount },
  } = data ?? { datas: [], meta: { totalCount: 0 } };
  const navigate = useNavigate();

  return (
    <>
      <TicketContainer>
        <Top>
          <div className="issued-title">
            <h3>{!isLoading && ticketData.title}</h3>
            <p>(총 {totalCount}건)</p>
          </div>
          <BackButton onClick={() => navigate(-1)}>
            <BackIcon />
            <p>뒤로가기</p>
          </BackButton>
        </Top>
        <IssuedListWrap>
          <div className="table">
            <div className="table-row title">
              <p>회원명</p>
              <p>연락처</p>
              <p>담당강사</p>
              <p>잔여횟수</p>
              <p>유효기간</p>
              <p> </p>
            </div>
            {!isLoading &&
              datas.map((v: Ticket_issued_list_datas) => {
                const { id: resId, owners, privateTutor, remainingTimes, startAt, endAt } = v;
                // 해당 아이디로 수강권 상세 조회
                return (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div
                    key={resId}
                    className="table-row"
                    onClick={() => {
                      setIssuedId(resId);
                      setIsOpen(true);
                    }}
                  >
                    <p className="icon-box">
                      <MemberIcon /> {owners[0].name}
                    </p>
                    <p>{owners[0].phone}</p>
                    <p>{privateTutor.name}</p>
                    <p>{remainingTimes ? `${remainingTimes}회` : '무제한'}</p>
                    <p>{`${startAt} - ${endAt}`}</p>
                    <DetailButton
                      onClick={e => {
                        e.stopPropagation();
                      }}
                      onMouseOver={e => {
                        e.stopPropagation();
                      }}
                    >
                      편집
                    </DetailButton>
                  </div>
                );
              })}
          </div>
        </IssuedListWrap>
      </TicketContainer>
      {isOpen && <IssuedTicketModal issuedId={issuedId} setIsOpen={setIsOpen} />}
    </>
  );
};

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    width: 6px;
    fill: ${theme.colors.gray[500]};
  }

  font-size: ${theme.font.sub};
  color: ${theme.colors.gray[500]};
`;

const DetailButton = styled.button`
  font-size: 14px;
  padding-inline: 0.2rem;
  padding-block: 0.3rem;
  background-color: ${theme.colors.gray[800]};
  color: ${theme.colors.gray[400]};
  border-radius: 6px;
  transition: all 0.4s;

  &:hover {
    font-weight: 600;
    background-color: ${theme.colors.gray[700]};
  }
`;

const IssuedListWrap = styled.div`
  font-size: 16px;

  .table {
    display: grid;
    width: 100%;
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr 1fr 2fr 0.5fr;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid ${theme.colors.gray[800]};
    text-align: left;
    cursor: pointer;

    &.title > p {
      font-weight: 600;
    }

    &.title {
      border-top: 1px solid ${theme.colors.gray[800]};
    }

    .icon-box {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-weight: 600;
    }

    p {
      transition: all 0.4s;
    }

    &:hover {
      p {
        opacity: 0.7;
      }

      &.title p {
        opacity: 1;
      }
    }
  }
`;

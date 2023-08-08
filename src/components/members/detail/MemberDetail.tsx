import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { styled } from 'styled-components';

import { MemberDetailResponse, MemberIssuedTicketType, MemberTicketResponse, sexEnum } from '@apis/membersAPIs';
import { BackIcon, Editicon, TicketIcon } from '@assets/icons/indexIcons';
import { BackButton } from '@components/center/ticket/TicketIssued';
import { Button } from '@components/common/Button';
import { useSwrData } from '@hooks/apis/useSwrData';
import { NoneDisplay, TicketContainer, TicketWrap, Top } from '@styles/center/ticketsStyle';
import { SchedulesDetailWrap } from '@styles/SchedulesStyle';
import theme from '@styles/theme';
import { formatTimestampDot } from '@utils/schedules/formatTimestamp';

import { TicketItem } from './TicketItem';

export const MemberDetail = () => {
  const navigate = useNavigate();
  const { memberId } = useParams();
  const { data } = useSwrData<MemberDetailResponse>(`members/${memberId}`);
  const { data: ticketData } = useSwrData<MemberTicketResponse>(`members/${memberId}/issued-tickets`);
  const [searchParams, setSearchParams] = useSearchParams();
  const isActivePath = searchParams.get('isActive') === 'true';
  const [tickets, setTickets] = useState<MemberIssuedTicketType[]>([]);

  const activeList = useMemo(
    () => tickets?.filter((v: MemberIssuedTicketType) => v.isSuspended !== true && v.isCanceled !== true) || [],
    [tickets]
  );
  const noneActiveList = useMemo(
    () => tickets.filter((v: MemberIssuedTicketType) => v.isSuspended === true || v.isCanceled === true) || [],
    [tickets]
  );

  const displayedList = useMemo(() => {
    if (!isActivePath) return noneActiveList;
    else return activeList;
  }, [isActivePath, activeList, noneActiveList]);

  useEffect(() => {
    setTickets(ticketData?.issuedTickets || []);
  }, [ticketData]);

  useEffect(() => {
    if (!searchParams.get('isActive')) {
      setSearchParams({
        isActive: 'true',
      });
    }
  }, [searchParams, setSearchParams]);

  return (
    data && (
      <>
        <SchedulesDetailWrap>
          <div>
            <div className="header">
              <div className="title">
                <h3>회원 정보</h3>
              </div>
              <BackButton onClick={() => navigate('/members')}>
                <BackIcon />
                <p>뒤로가기</p>
              </BackButton>
            </div>
            <S.list>
              <li>
                <div className="pic">
                  <img alt="profile" src="/imgs/profile.png" />
                </div>
                <p>
                  <span>이름</span>
                  {data.name}
                </p>
                <p>
                  <span>생년월일</span>
                  {formatTimestampDot(data.birthDate)}
                </p>
                <p>
                  <span>등록일</span>
                  {formatTimestampDot(data.createdAt)}
                </p>
                <p>
                  <span>성별</span>
                  {sexEnum[data.sex]}
                </p>
                <p>
                  <span>전화번호</span>
                  {data.phone.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
                </p>
              </li>
              <li className="btn-wrap">
                <Editicon
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/members/${memberId}/edit`);
                  }}
                />
              </li>
            </S.list>
          </div>

          <div>
            <Top>
              <div className="ticket-active">
                <Link className={isActivePath ? 'on' : ''} to="?isActive=true">{`이용 중(${activeList.length})`}</Link>
                <Link
                  className={!isActivePath ? 'on' : ''}
                  to="?isActive=false"
                >{`이용중단(${noneActiveList.length})`}</Link>
              </div>
              <Button
                onClick={() => {
                  navigate('tickets');
                }}
              >
                + 수강권 부여
              </Button>
            </Top>
            <TicketContainer>
              <TicketWrap>
                {Array.from(
                  { length: displayedList.length },
                  (_, i) => displayedList[displayedList.length - 1 - i]
                ).map((ticket: MemberIssuedTicketType) => {
                  return <TicketItem key={ticket.id} ticket={ticket} />;
                })}
              </TicketWrap>
            </TicketContainer>
          </div>
        </SchedulesDetailWrap>

        {displayedList.length === 0 && (
          <>
            <NoneDisplay>
              <div className="none-d-icon">
                <TicketIcon />
              </div>
              <div className="text">{isActivePath ? '이용 중인' : '이용 중단된'} 수강권이 없습니다!</div>
            </NoneDisplay>
          </>
        )}
      </>
    )
  );
};

const S = {
  list: styled.ul`
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid ${theme.colors.gray[800]};
    text-align: left;
    border-radius: 6px;
    font-size: 15px;
    justify-content: space-between;

    & > li {
      display: flex;
      align-items: center;

      & > .pic {
        margin-right: 10px;
      }

      & > p {
        & > span {
          color: gray;
          margin-right: 10px;
        }
      }

      & > p:nth-of-type(1) {
        width: 140px;
      }
      & > p:nth-of-type(2) {
        width: 180px;
      }
      & > p:nth-of-type(3) {
        width: 170px;
      }
      & > p:nth-of-type(4) {
        width: 80px;
      }
      & > p:nth-of-type(5) {
        width: 200px;
      }
    }
  `,

  EditMemberInfo: styled.ul`
    text-align: left;

    & > li {
      margin-bottom: 14px;
    }
  `,

  ModalInfoTop: styled.div`
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
  `,
  ModalInfoStyle: styled.div`
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
  `,
};

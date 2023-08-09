import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { MemberDetailResponse, MemberIssuedTicketType, MemberTicketResponse, sexEnum } from '@apis/membersAPIs';
import { BackIcon, Editicon, MemberIcon, TicketIcon } from '@assets/icons/indexIcons';
import { Button } from '@components/common/Button';
import { useSwrData } from '@hooks/apis/useSwrData';
import { BackButton } from '@styles/common/buttonStyle';
import { NoneDisplay, TicketContainer, TicketWrap, Top } from '@styles/common/ticketsStyle';
import { DetailWrap } from '@styles/common/wrapStyle';
import { MemberInfoBar } from '@styles/pages/memberStyle';
import { formatTimestampDot } from '@utils/schedules/formatTimestamp';

import { TicketItem } from './TicketItem';

export const MemberDetail = () => {
  const navigate = useNavigate();
  const { memberId } = useParams();
  const { data } = useSwrData<MemberDetailResponse>(`members/${memberId}`);
  const { data: ticketData } = useSwrData<MemberTicketResponse>(`members/${memberId}/issued-tickets`);
  const [searchParams, setSearchParams] = useSearchParams();
  const isActivePath = searchParams.get('isActive') === 'true' || searchParams.get('isActive') === null;
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
    if (isActivePath === false) return noneActiveList;
    else return activeList;
  }, [isActivePath, activeList, noneActiveList]);

  useEffect(() => {
    setTickets(ticketData?.issuedTickets || []);
  }, [ticketData]);

  return (
    data && (
      <>
        <DetailWrap $marginTop="0">
          <div>
            <div className="header">
              <div className="title">
                <h3>회원 정보</h3>
              </div>
              <BackButton onClick={() => navigate(-1)}>
                <BackIcon />
                <p>뒤로가기</p>
              </BackButton>
            </div>
            <MemberInfoBar>
              <li>
                <div className="pic">
                  <MemberIcon />
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
            </MemberInfoBar>
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
        </DetailWrap>

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

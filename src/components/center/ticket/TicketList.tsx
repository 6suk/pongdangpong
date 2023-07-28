import { useEffect, useMemo, useState } from 'react';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { styled } from 'styled-components';

import { Ticket_response, tickets_list } from '@apis/ticketsAPIs';
import { TicketIcon } from '@assets/icons/indexIcons';
import { Button } from '@components/common/Button';
import { useSwrData } from '@hooks/apis/useSwrData';

import theme from '@styles/theme';

import { TicketContainer, TicketItem, TicketWrap } from './TicketItem';

export const TicketList = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useSwrData(tickets_list.url);
  const [searchParams, setSearchParams] = useSearchParams();
  const isActivePath = searchParams.get('isActive') === 'true';

  useEffect(() => {
    if (!searchParams.get('isActive')) {
      setSearchParams({
        isActive: 'true',
      });
    }
  }, [searchParams, setSearchParams]);

  // 판매중, 판매종료로 받는 API가 없어 직접 데이터 조작
  const activeList = useMemo(() => data?.tickets?.filter((v: Ticket_response) => v.isActive === true) || [], [data]);
  const noneActiveList = useMemo(
    () => data?.tickets?.filter((v: Ticket_response) => v.isActive !== true) || [],
    [data]
  );
  const displayedList = useMemo(() => {
    if (!isActivePath) return noneActiveList;
    else return activeList;
  }, [isActivePath, activeList, noneActiveList]);

  return (
    <>
      <TicketContainer>
        <Top>
          <div className="ticket-active">
            <Link className={isActivePath ? 'on' : ''} to="?isActive=true">{`판매중(${activeList.length})`}</Link>
            <Link
              className={!isActivePath ? 'on' : ''}
              to="?isActive=false"
            >{`판매종료(${noneActiveList.length})`}</Link>
          </div>
          <Button
            onClick={() => {
              navigate('new');
            }}
          >
            + 수강권 추가
          </Button>
        </Top>

        {!isLoading && (
          <TicketWrap>
            {Array.from({ length: displayedList.length }, (_, i) => displayedList[displayedList.length - 1 - i]).map(
              (ticket: Ticket_response) => {
                return <TicketItem key={ticket.id} ticket={ticket} />;
              }
            )}
          </TicketWrap>
        )}
        {isError && <p>{isError.response?.data.message}</p>}
      </TicketContainer>

      {displayedList.length === 0 && (
        <>
          <NoneDisplay>
            <div className="none-d-icon">
              <TicketIcon />
            </div>
            <div className="text">{isActivePath ? '판매 중인' : '판매 종료된'} 수강권이 없습니다!</div>
          </NoneDisplay>
        </>
      )}
    </>
  );
};

const NoneDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  justify-content: center;
  margin-top: 3rem;

  .none-d-icon {
    background-color: ${theme.colors.gray[800]};
    padding: 30px;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
  }

  svg {
    width: 90px;
    fill: ${theme.colors.gray[600]};
  }
  .text {
    color: ${theme.colors.gray[500]};
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-block: 2rem;
  align-items: center;
  margin-inline: 1rem;
  align-items: flex-end;

  .ticket-active {
    display: flex;

    a {
      font-size: ${theme.font.sub};
      color: ${theme.colors.gray[500]};
      padding: 12px;
      border-bottom: 2px solid ${theme.colors.gray[600]};
    }

    .on {
      font-weight: 600;
      color: ${theme.colors.pri[500]};
      border-bottom: 2px solid ${theme.colors.pri[300]};
    }
  }
`;

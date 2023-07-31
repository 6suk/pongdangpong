import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { styled } from 'styled-components';

import { Staffs_list_dats_type } from '@apis/staffsAPIs';
import { MemberIcon } from '@assets/icons/indexIcons';
import { Button } from '@components/common/Button';
import { useSwrData } from '@hooks/apis/useSwrData';
import { CenterContainer } from '@styles/center/ticketsStyle';

import theme from '@styles/theme';

import { StaffsEditModal } from './StaffsEditModal';
import { DetailButton } from '../ticket/TicketIssued';

export const StaffsList = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useSwrData(`staffs${window.location.search}`);
  const [searchParams, setSearchParams] = useSearchParams();
  const { meta, datas: staffsDatas } = data ?? { meta: {}, datas: [] };
  const isActivePath = searchParams.get('sort') === 'createdAt,Desc';
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    if (searchParams.size === 0) {
      setSearchParams({
        page: '1',
        sort: 'createdAt,Desc',
      });
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <CenterContainer>
        <StaffsTop>
          <div>
            <h3>
              직원 리스트 <span className="highlight">3</span>
            </h3>
          </div>
          <div className="sort-and-btn">
            <div className="ticket-active">
              <Link className={isActivePath ? 'on' : ''} to="?sort=createdAt,Desc">{`등록일`}</Link>
              <Link className={!isActivePath ? 'on' : ''} to="?sort=name,Desc">{`이름순`}</Link>
            </div>
            <Button
              onClick={() => {
                navigate('new');
              }}
            >
              + 직원등록
            </Button>
          </div>
        </StaffsTop>
        <StaffsLIstWrap>
          <div className="table">
            <div className="table-row title">
              <p>직원명</p>
              <p>연락처</p>
              <p>총 회원수</p>
              <p>평점</p>
              <p>메모</p>
              <p></p>
            </div>
            {!isLoading &&
              staffsDatas.map((v: Staffs_list_dats_type) => {
                const { id, name, phone, memberCount, rating, memo } = v;
                return (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div
                    key={id}
                    className="table-row"
                    onClick={() => {
                      navigate(`${id}`);
                    }}
                  >
                    <p className="icon-box">
                      <MemberIcon /> {name}
                    </p>
                    <p>{phone}</p>
                    <p>{memberCount}</p>
                    <p>{rating}</p>
                    <p>{memo}</p>
                    <DetailButton
                      onClick={e => {
                        e.stopPropagation();
                        setEditId(id);
                        setIsOpen(true);
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
        </StaffsLIstWrap>
      </CenterContainer>
      {isOpen && <StaffsEditModal id={editId} setIsOpen={setIsOpen} />}
    </>
  );
};

const StaffsTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-block: 2rem;
  align-items: center;
  margin-inline: 1rem;

  h3 {
    font-weight: bold;
    size: ${theme.font.title};

    .highlight {
      color: ${theme.colors.pri[500]};
    }
  }

  .sort-and-btn {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .ticket-active {
    display: flex;
    gap: 0.5rem;

    a {
      font-size: ${theme.font.sub};
      color: ${theme.colors.gray[500]};
      /* padding: 12px; */
      /* border-bottom: 2px solid ${theme.colors.gray[600]}; */
    }

    .on {
      font-weight: 600;
      color: ${theme.colors.pri[500]};
      /* border-bottom: 2px solid ${theme.colors.pri[300]}; */
    }
  }
`;

const StaffsLIstWrap = styled.div`
  font-size: 16px;
  margin-inline: 1rem;

  .table {
    display: grid;
    width: 100%;
    gap: 1rem;
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr 1fr 2fr 0.5fr;
    align-items: center;
    padding: 1rem;
    border: 1px solid ${theme.colors.gray[800]};
    text-align: left;
    cursor: pointer;
    border-radius: 6px;
    font-size: 14px;

    &.title > p {
      font-weight: 600;
    }

    &.title {
      /* border-top: 1px solid ${theme.colors.gray[800]}; */
      border: none;
      padding-block: 0;
    }

    .icon-box {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-weight: 600;

      svg {
        width: 26px;
        height: auto;
      }
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

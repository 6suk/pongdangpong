import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

import { mutate } from 'swr';

import { SearchIcon } from '@assets/icons/indexIcons';
import { Button } from '@components/common/Button';
import { MembersDetailComponent } from '@components/members//MembersDetail';
import { MembersAddTicekt } from '@components/members/MembersAddTicekt';
import { MembersAlbum } from '@components/members/MembersAlbum';
import { MembersRecord } from '@components/members/MembersRecord';
import { MembersResgier } from '@components/members/MembersRegister';
import { useSwrData } from '@hooks/apis/useSwrData';

import { SC } from '@styles/styles';

import theme from '@styles/theme';

import { type } from './../../apis/ticketsAPIs';

interface UserListProps {
  [key: string]: string;
}
const Members = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const pathSlice = location.pathname.split('/');
  const currentPathname = pathSlice[pathSlice.length - 1];

  const [pageState, setPageState] = useState({
    pageQuery: 1,
    pageNavNum: 1,
  });

  const userIdRef = useRef(null);
  const pageNationRef = useRef(null);

  const len = 10;
  const { data, isLoading } = useSwrData(`members?page=${pageState['pageQuery']}&size=${len}&sort=createdAt%2CDesc`);
  const { data: subDatas, isLoading: subDatasIsLoading } = useSwrData(`members?page=0&size=200&sort=createdAt%2CDesc`);
  const { data: ticketData } = useSwrData('tickets') ?? {};
  const { data: staffsData } = useSwrData('staffs');

  const { datas } = data ?? ({} as UserListProps);
  const { datas: staffsDatas } = staffsData ?? {};

  const [totalUser, setTotalUser] = useState(0);
  const [btnActive, setBtnActive] = useState(1);

  const currentPageLen = useMemo(() => {
    const pageLen = subDatas?.datas.length / 10;
    return Math.ceil(pageLen);
  }, [subDatas]);

  const dataChange = useCallback((type: string, value: string) => {
    switch (type) {
      case 'birthDate':
        value = value.replace(/-/gi, '.');
        break;
      case 'createdAt':
        value = value.split('T')[0].replace(/-/gi, '.');
        break;
      case 'sex':
        value = value === 'MALE' ? '남' : value === 'FEMALE' ? '여' : value;
        break;
      case 'phone':
        value = value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        break;
    }
    return value;
  }, []);

  useEffect(() => {
    mutate(`members?page=${pageState.pageQuery}&size=${len}&sort=createdAt%2CDesc`);
  });

  useEffect(() => {
    setTotalUser(subDatas?.datas.length);
  }, [subDatasIsLoading, subDatas?.datas]);

  // 전체 회원조회
  // search?resource=MEMBER

  // query 특정 회원조회
  // search?query=%EC%B9%98%ED%82%A8&resource=MEMBER
  // const url = `search?query=${query}&resource=MEMBER`;

  // const query = encodeURIComponent('치킨');
  // const [urlQuery, setUrlQuery] = useState('');

  return (
    <div>
      {currentPathname === 'register' && <MembersResgier />}
      {currentPathname === 'detail' && (
        <MembersDetailComponent id={userIdRef.current} staffsDatas={staffsDatas} tickets={ticketData?.tickets} />
      )}
      {currentPathname === 'record' && <MembersRecord />}
      {currentPathname === 'album' && <MembersAlbum />}
      {currentPathname === 'addTicket' && (
        <MembersAddTicekt
          id={userIdRef.current}
          members={datas}
          staffsDatas={staffsDatas}
          tickets={ticketData?.tickets}
        />
      )}

      {location.pathname === '/members' && !isLoading && (
        <>
          <S.wrap>
            <div className="top-left">
              <SC.Select>
                <option value="등록일">등록일</option>
                <option value="등록일">이름순</option>
                <option value="등록일">최근작성일</option>
              </SC.Select>

              <div className="search-bar">
                <SC.InputField
                  id="search"
                  name="search"
                  placeholder="회원/멤버 이름, 연락처로 검색하세요"
                  type="search"
                  width={'300px'}
                />
                <button className="search-submit" type="submit">
                  <SearchIcon />
                </button>
              </div>
            </div>

            <Button
              onClick={() => {
                navigation('register');
              }}
            >
              + 회원 등록
            </Button>
          </S.wrap>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
            전체 회원 <span style={{ color: 'royalblue' }}>{totalUser}</span>
          </h2>

          {!isLoading &&
            datas
              .sort((a, b) => a.id - b.id)
              .reverse()
              .map(({ name, phone, sex, birthDate, createdAt }: UserListProps, idx: number) => {
                return (
                  <S.list key={idx}>
                    <li>
                      <div className="pic">
                        <img alt="profile" src="/imgs/profile.png" />
                      </div>
                      <p>
                        <span>이름</span>
                        {name}
                      </p>
                      <p>
                        <span>생년월일</span>
                        {dataChange('birthDate', birthDate)}
                      </p>
                      <p>
                        <span>등록일</span>
                        {dataChange('createdAt', createdAt)}
                      </p>
                      <p>
                        <span>성별</span>
                        {dataChange('sex', sex)}
                      </p>
                      <p>
                        <span>전화번호</span>
                        {dataChange('phone', phone)}
                      </p>
                    </li>

                    <li className="btn-wrap">
                      <Button
                        size="md"
                        type="button"
                        onClick={() => {
                          userIdRef.current = datas[idx].id;
                          navigation('detail');
                        }}
                      >
                        수강권 관리
                      </Button>
                    </li>
                  </S.list>
                );
              })}
        </>
      )}

      <S.pageNation ref={pageNationRef}>
        {pageState.pageNavNum >= 11 && currentPathname === 'members' && (
          <button
            type="button"
            onClick={() => {
              setPageState({
                ...pageState,
                ['pageNavNum']: pageState['pageNavNum'] - 10,
              });
            }}
          >
            {'<'}
          </button>
        )}

        {subDatas &&
          currentPathname === 'members' &&
          Array(10)
            .fill(0)
            .map((_, i) => {
              let pageV = 0;
              if (currentPageLen >= i + pageState.pageNavNum) pageV = i + pageState.pageNavNum;
              else return;
              return (
                <button
                  key={i + 1}
                  className={`pageBtn ${btnActive === i + pageState.pageNavNum ? 'on ' : ''}`}
                  data-index={i + 1}
                  type="button"
                  onClick={e => {
                    setPageState({ ...pageState, ['pageQuery']: +e.target.textContent });
                    setBtnActive(+e.target.textContent);
                  }}
                >
                  {pageV}
                </button>
              );
            })}
        {pageState.pageNavNum <= 10 && currentPathname === 'members' && (
          <button
            type="button"
            onClick={() => {
              setPageState({
                ...pageState,
                ['pageNavNum']: pageState['pageNavNum'] + 10,
              });
            }}
          >
            ...
          </button>
        )}
      </S.pageNation>
    </div>
  );
};

const S = {
  list: styled.ul`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 6px 10px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;

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
  wrap: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    input {
      margin-left: 10px;
    }

    button {
      margin-left: auto;
    }

    .top-left {
      display: flex;

      select {
        width: auto;
      }

      input[type='text'] {
        width: 100%;
      }
    }

    .search-bar {
      position: relative;
      display: flex;
      align-items: center;

      .search-submit {
        position: absolute;
        right: 0;
        margin-right: 1rem;
        transition: all 0.4s;

        &:hover {
          opacity: 0.5;
        }

        svg {
          width: 17px;
          fill: ${theme.colors.gray[400]};
        }
      }
    }
  `,
  pageNation: styled.div`
    width: 380px;
    display: flex;
    justify-content: center;
    margin: 0 auto;

    & > button[type='button'].pageBtn {
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      display: block;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: gray;
      color: #fff;
      margin: 0 10px;

      &.on {
        background-color: royalblue;
      }
    }
  `,
};

export default Members;

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MembersAddTicekt } from '@components/members/MembersAddTicekt';
import { styled } from 'styled-components';

import { mutate } from 'swr';

import { ArrowIcon, MemberIcon, SearchIcon } from '@assets/icons/indexIcons';
import { StaffsLIstWrap } from '@components/center/staff/StaffsList';
import { Button } from '@components/common/Button';
import { MembersAlbum } from '@components/members/backup/MembersAlbum';
import { MembersDetailComponent } from '@components/members/backup/MembersDetail';
import { MembersResgier } from '@components/members/MembersRegister';
import { useSwrData } from '@hooks/apis/useSwrData';

import { SC } from '@styles/styles';

import theme from '@styles/theme';

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
  const url = `members?page=${pageState['pageQuery']}&size=${len}&sort=createdAt%2CDesc`;
  const { data: userListData, isLoading } = useSwrData(url);
  const { data: subDatas, isLoading: subDatasIsLoading } = useSwrData(`members?page=0&size=200&sort=createdAt%2CDesc`);
  const { data: ticketData } = useSwrData('tickets') ?? {};
  const { data: staffsData } = useSwrData('staffs');

  const { datas } = userListData ?? ({} as UserListProps);
  const { datas: staffsDatas } = staffsData ?? {};

  const [totalUser, setTotalUser] = useState(0);
  const [btnActive, setBtnActive] = useState(1);

  // 페이지네이션 계산 값
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
    setTotalUser(subDatas?.datas.length);
    mutate(`members?page=${pageState.pageQuery}&size=${len}&sort=createdAt%2CDesc`);
  });

  // search?resource=MEMBER

  // query 특정 회원조회
  // search?query=%EC%B9%98%ED%82%A8&resource=MEMBER
  // const url = `search?query=${query}&resource=MEMBER`;

  // const query = encodeURIComponent('치킨');
  // const [urlQuery, setUrlQuery] = useState('');

  // enter 또는 클릭하면 해당 데이터를 불러옴
  // 불러온 데이터로 기존의  데이터를 갈아치운다.
  // 만약 데이터 값들이 비어있다면 기존 데이터를 출력

  const [searchState, setSearchState] = useState('');
  const searchUrl = `search?query=${searchState}&resource=MEMBER`;
  const { data: searchData, isLoading: searchIsLoading } = useSwrData(searchUrl);
  const [searchUserList, setSearchUserList] = useState(null);

  useEffect(() => {
    console.log(searchUserList);
  }, [searchUserList]);

  return (
    <>
      {currentPathname === 'register' && <MembersResgier />}
      {currentPathname === 'detail' && (
        <MembersDetailComponent id={userIdRef.current} staffsDatas={staffsDatas} tickets={ticketData?.tickets} />
      )}
      {currentPathname === 'album' && <MembersAlbum />}
      {currentPathname === 'addTicket' && (
        <MembersAddTicekt
          id={userIdRef.current}
          members={datas}
          staffsDatas={staffsDatas}
          tickets={ticketData?.tickets}
        />
      )}

      <Container>
        {location.pathname === '/members' && !isLoading && (
          <>
            <S.wrap>
              <TopTitle>
                <h3>
                  전체 회원 <span className="highlight">{totalUser}</span>
                </h3>
              </TopTitle>
              <div className="top-left">
                <div className="search-bar">
                  <SC.InputField
                    id="search"
                    name="search"
                    placeholder="회원/멤버 이름, 연락처로 검색하세요"
                    type="search"
                    width={'300px'}
                    onChange={e => {
                      setSearchState(e.target.value);
                    }}
                    // onKeyDown={() => {
                    //   console.log(`${searchState}키 이벤트`);
                    // }}
                  />
                  <button
                    className="search-submit"
                    type="submit"
                    onClick={() => {
                      console.log(`${searchState} 아이콘 클릭`);
                      setSearchUserList(searchData?.members);
                    }}
                  >
                    <SearchIcon />
                  </button>
                </div>
                <SC.Select>
                  <option value="등록일">등록일</option>
                  <option value="등록일">이름순</option>
                  <option value="등록일">최근작성일</option>
                </SC.Select>
                <Button
                  onClick={() => {
                    navigation('register');
                  }}
                >
                  + 회원 등록
                </Button>
              </div>
            </S.wrap>

            <StaffsLIstWrap>
              <div className="table">
                <div className="table-row title">
                  <p>이름</p>
                  <p>전화번호</p>
                  <p>생년월일</p>
                  <p>성별</p>
                  <p>등록일</p>
                  <p></p>
                </div>

                {/* 회원 리스트 */}
                {/* !searchIsLoading && searchUserList?.members?.length ? searchUserList?.members :  */}
                {(searchUserList?.length && JSON.stringify(searchUserList)) ||
                  datas
                    ?.sort((a, b) => a.id - b.id)
                    .reverse()
                    ?.map(({ name, phone, sex, birthDate, createdAt }: UserListProps, idx: number) => {
                      return (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                        <div
                          key={idx}
                          className="table-row"
                          onClick={() => {
                            userIdRef.current = datas[idx].id;
                            navigation('detail');
                          }}
                        >
                          <p className="icon-box">
                            <MemberIcon /> <span>{name}</span>
                          </p>
                          <p>{dataChange('phone', phone)}</p>
                          <p>{dataChange('birthDate', birthDate)}</p>
                          <p>{dataChange('sex', sex)}</p>
                          <p>{dataChange('createdAt', createdAt)}</p>
                          <DetailButton
                            onClick={e => {
                              e.stopPropagation();
                              userIdRef.current = datas[idx].id;
                              navigation('detail');
                            }}
                            onMouseOver={e => {
                              e.stopPropagation();
                            }}
                          >
                            수강권 관리
                          </DetailButton>
                        </div>
                      );
                    })}
              </div>
            </StaffsLIstWrap>
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
              className="pageBtn"
              type="button"
              onClick={() => {
                setPageState({
                  ...pageState,
                  ['pageNavNum']: pageState['pageNavNum'] + 10,
                });
              }}
            >
              <ArrowIcon />
            </button>
          )}
        </S.pageNation>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
`;

const DetailButton = styled.button`
  font-size: 14px;
  padding-inline: 0.4rem;
  padding-block: 0.3rem;
  background-color: ${theme.colors.pri[900]};
  color: ${theme.colors.pri[600]};
  border-radius: 6px;
  transition: all 0.4s;

  &:hover {
    font-weight: 600;
    background-color: ${theme.colors.pri[800]};
  }
`;

const TopTitle = styled.div`
  display: flex;
  flex-direction: row;
  padding-block: 1rem;
  align-items: center;
  margin-inline: 1rem;

  h3 {
    font-weight: bold;
    size: ${theme.font.title};

    .highlight {
      color: ${theme.colors.pri[500]};
    }
  }
`;

const S = {
  list: styled.ul`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 6px 10px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    font-size: ${theme.font.sub};

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
    margin-inline: 1rem;
    justify-content: space-between;

    button {
      margin-left: auto;
    }

    .top-left {
      display: flex;
      gap: 1rem;
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
    display: flex;
    justify-content: center;
    font-size: ${theme.font.sub};
    margin-top: 2rem;

    & > button[type='button'].pageBtn {
      width: 33px;
      aspect-ratio: 1/1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: 1px solid ${theme.colors.inputBorder};
      color: ${theme.colors.gray[600]};
      &.on {
        background-color: ${theme.colors.pri[900]};
        color: ${theme.colors.pri[500]};
      }

      &:first-child {
        border-radius: 6px 0px 0px 6px;
      }
      &:last-child {
        border-radius: 0px 6px 6px 0px;
      }
      &:not(:last-child) {
        border-right: 0;
      }

      svg {
        width: 8px;
        fill: ${theme.colors.gray[600]};
      }
    }
  `,
};

export default Members;

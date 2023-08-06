import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { styled } from 'styled-components';

import { MemberListResponse, MemberSearchResponse } from '@apis/membersAPIs';
import { ArrowIcon, CloseIcon, SearchIcon } from '@assets/icons/indexIcons';
import { StaffsLIstWrap } from '@components/center/staff/StaffsList';
import { Button } from '@components/common/Button';
import { MemberListDefault } from '@components/members/list/MemberListDefault';
import { MemberListSearch } from '@components/members/list/MemberListSearch';
import { useSwrData } from '@hooks/apis/useSwrData';
import useInput from '@hooks/utils/useInput';
import { usePagination } from '@hooks/utils/usePagination';
import { Pagination } from '@styles/paginaionStyle';
import { SC } from '@styles/styles';
import theme from '@styles/theme';

export interface SetQueryType {
  page?: number;
  size?: number;
  sort?: string | null;
}

const searchPath = (search: string) => {
  return `search?resource=MEMBER&query=${search}`;
};

export const MemberList = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValues, onChange, inputReset] = useInput({ query: '', sort: 'createdAt,Desc' });
  const { query, sort } = inputValues;
  const [isSearch, setIsSearch] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [requestPath, setRequestPath] = useState<string>(`${pathname}${search}`);
  const { data } = useSwrData<MemberListResponse | MemberSearchResponse>(requestPath);

  // 페이지네이션
  const itemsPerPage = 15;
  const { currentPage, totalPages, pageRange, setCurrentPage, updatePageRange } = usePagination(
    totalCount,
    itemsPerPage,
    10
  );

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
    setIsSearch(true);
    setRequestPath(searchPath(query));
  };

  // 정렬 컨트롤
  useEffect(() => {
    setSearchParams({ sort: sort });
  }, [sort]);

  // 검색 컨트롤
  useEffect(() => {
    if (!query) setIsSearch(false);
  }, [query]);

  // 초기값 & 검색 시
  useEffect(() => {
    if (!isSearch) {
      searchParams.set('sort', sort || 'createdAt,Desc');
      searchParams.set('page', currentPage.toString() || '1');
      searchParams.set('size', itemsPerPage.toString());
      setRequestPath(`${pathname}${search}`);
    } else {
      searchParams.delete('page');
      searchParams.delete('sort');
      searchParams.delete('size');
    }
    setSearchParams(searchParams);
  }, [isSearch, search, currentPage]);

  return (
    <>
      <Container>
        <>
          <S.wrap>
            <TopTitle>
              <h3>
                {isSearch ? `검색 결과` : '전체 회원'} <span className="highlight">{totalCount}</span>
              </h3>
            </TopTitle>
            <div className="top-left">
              <form className="search-bar" onSubmit={handleSearchSubmit}>
                <SC.InputField
                  name="query"
                  placeholder="회원/멤버 이름, 연락처로 검색하세요"
                  type="text"
                  value={query}
                  width={'300px !important'}
                  onChange={onChange}
                />
                {isSearch ? (
                  <button
                    className="search-submit"
                    type="button"
                    onClick={() => {
                      inputReset();
                      setCurrentPage(1);
                    }}
                  >
                    <CloseIcon style={{ width: '12px' }} />
                  </button>
                ) : (
                  <button className="search-submit" type="submit">
                    <SearchIcon />
                  </button>
                )}
              </form>
              {!isSearch && (
                <SC.Select
                  name="sort"
                  value={sort}
                  onChange={e => {
                    onChange(e);
                    setCurrentPage(1);
                  }}
                >
                  <option value="createdAt,Desc">등록일</option>
                  <option value="name">이름순</option>
                  <option value="updatedAt,Desc">최근작성일</option>
                </SC.Select>
              )}
              <Button
                onClick={() => {
                  navigate('register');
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

              {/* 리스트 출력
                - 이름 및 연락처 검색
                - 정렬 및 페이지네이션
                - 각각 요청하는 API가 달라 컴포넌트 분리
              */}
              {data && 'meta' in data && !isSearch && (
                <MemberListDefault
                  data={data as MemberListResponse}
                  setRequestPath={setRequestPath}
                  setTotalCount={setTotalCount}
                />
              )}
              {data && 'members' in data && isSearch && (
                <MemberListSearch
                  data={data as MemberSearchResponse}
                  query={{ currentPage, itemsPerPage }}
                  setTotalCount={setTotalCount}
                />
              )}
              {/* 리스트 출력 끝 */}

              {/* 페이지 네이션 */}
              {totalPages > 1 && (
                <Pagination>
                  {pageRange[0] > 1 && (
                    <button
                      className="pageBtn prev"
                      type="button"
                      onClick={() => {
                        updatePageRange('prev');
                        scrollToTop();
                      }}
                    >
                      <ArrowIcon />
                    </button>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(pageNum => pageNum >= pageRange[0] && pageNum <= pageRange[1])
                    .map(pageNum => (
                      <button
                        key={pageNum}
                        className={`pageBtn ${currentPage === pageNum ? 'on' : ''}`}
                        disabled={currentPage === pageNum}
                        type="button"
                        onClick={() => {
                          setCurrentPage(pageNum);
                          scrollToTop();
                        }}
                      >
                        {pageNum}
                      </button>
                    ))}
                  {pageRange[1] < totalPages && (
                    <button
                      className="pageBtn next"
                      type="button"
                      onClick={() => {
                        updatePageRange('next');
                        scrollToTop();
                      }}
                    >
                      <ArrowIcon />
                    </button>
                  )}
                </Pagination>
              )}
              {/* 페이지 네이션 */}
            </div>
          </StaffsLIstWrap>
        </>
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

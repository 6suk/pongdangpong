import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ArrowIcon, MemberIcon, SearchIcon } from '@assets/icons/indexIcons';
import { Modal } from '@components/common/Modal';
import { useSwrData } from '@hooks/apis/useSwrData';

import { usePagination } from '@hooks/utils/usePagination';
import { setFindMember, setFindUser } from '@stores/findUsersSlice';

import { SC } from '@styles/common/inputsStyles';
import { Pagination } from '@styles/common/paginaionStyle';

import { ModalSearchTop, Searchbar } from '@styles/common/SearchBarStyle';

import { ModalList, ModalListTop } from '@styles/modal/modalStyle';
import { formatPhoneNumber } from '@utils/formatPhoneNumber';

import { MemberSearchType, UserType, UsersSearchType } from '../../apis/schedulesAPIs';

export interface MemberOrUserSearchModalProps {
  type: 'USER' | 'MEMBER';
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const dataGetKey = {
  MEMBER: 'members',
  USER: 'users',
};

const userTypeEnum: { [key in UserType]: string } = {
  ADMIN: '관리자',
  STAFF: '직원',
};

export const MemberOrUserSearchModal = ({ type, setIsOpen }: MemberOrUserSearchModalProps) => {
  const dispatch = useDispatch();
  const [requestURL, setrequestURL] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const { data, isLoading } = useSwrData(requestURL);
  const requestData = data?.[dataGetKey[type]];

  /* type이 'USER'일 때만 isActive가 true인 항목을 필터링 */
  const filteredData = requestData
    ? requestData.filter((v: MemberSearchType | UsersSearchType) => {
        if (type === 'USER' && isUsersSearchType(v)) {
          return v.isActive;
        }
        return true;
      })
    : [];

  /* 페이지 네이션 */
  const itemsPerPage = 9;
  const pagesPerRange = 5;
  const totalItems = filteredData.length;
  const { currentPage, totalPages, pageRange, setCurrentPage, updatePageRange } = usePagination(
    totalItems,
    itemsPerPage,
    pagesPerRange
  );
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  /* 선택한 데이터 저장 */
  const setSelectedData = (id?: number, name?: string) => {
    switch (type) {
      case 'USER':
        dispatch(setFindUser({ id, name }));
        break;
      case 'MEMBER':
        dispatch(setFindMember({ id, name }));
        break;
    }
    setIsOpen(false);
  };

  /* MEMBER | UESR 타입 구분  */
  function isUsersSearchType(obj: MemberSearchType | UsersSearchType): obj is UsersSearchType {
    return 'type' in obj;
  }

  const handleQuerySearch = () => {
    if (query !== '') {
      if (!isNaN(parseInt(query)) && query.length === 11) {
        setrequestURL(`search?resource=${type}&query=${formatPhoneNumber(query)}`);
      } else {
        setrequestURL(`search?resource=${type}&query=${query}`);
      }
    } else {
      setrequestURL(`search?resource=${type}`);
    }
  };

  useEffect(() => {
    if (query === '') {
      setrequestURL(`search?resource=${type}`);
    }
  }, [query]);

  return (
    <>
      <Modal closeOnClick={false} isScollbar={false} maxWidth="43rem" minHeight="800px" setIsOpen={setIsOpen}>
        {!isLoading && (
          <>
            <ModalSearchTop>
              <div className="title-left">
                <h2>{type === 'USER' ? '담당 강사' : '회원'} 선택</h2>
                {/* <p>일정을 진행할 {type === 'USER' ? '강사' : '회원'}를 선택해 주세요.</p> */}
              </div>
              <Searchbar onSubmit={handleQuerySearch}>
                <form>
                  <SC.InputField
                    id="search"
                    name="search"
                    placeholder='이름 또는 "-"를 제외한 연락처를 입력해주세요.'
                    type="text"
                    value={query}
                    width={'350px'}
                    onChange={e => setQuery(e.target.value)}
                  />
                  <button className="search-submit" type="submit">
                    <SearchIcon />
                  </button>
                </form>
              </Searchbar>
            </ModalSearchTop>
            <ul>
              <ModalListTop>
                <div className="left">
                  <p>목록</p>
                  <p></p>
                  {type === 'USER' ? <p>이름/아이디</p> : <p>이름</p>}
                </div>
                <p>핸드폰 번호</p>
              </ModalListTop>

              {currentData.map((v: MemberSearchType | UsersSearchType) => {
                const userType = isUsersSearchType(v) ? userTypeEnum[v.type] : '회원';
                return (
                  <ModalList key={v.id}>
                    <button type="button" onClick={() => setSelectedData(v.id, v.name)}>
                      <div className="left">
                        <MemberIcon />
                        <p className="tag">{userType}</p>
                        <p className="info">
                          {v.name}
                          {isUsersSearchType(v) ? <span> {v.loginId}</span> : ''}
                        </p>
                      </div>
                      <p>{v.phone}</p>
                    </button>
                  </ModalList>
                );
              })}
            </ul>

            {/* 페이지 네이션 시작 */}
            {totalPages > 1 && (
              <Pagination className="modal">
                {pageRange[0] > 1 && (
                  <button className="pageBtn prev" type="button" onClick={() => updatePageRange('prev')}>
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
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ))}
                {pageRange[1] < totalPages && (
                  <button className="pageBtn next" type="button" onClick={() => updatePageRange('next')}>
                    <ArrowIcon />
                  </button>
                )}
              </Pagination>
            )}
            {/* 페이지 네이션 끝 */}
          </>
        )}
      </Modal>
    </>
  );
};

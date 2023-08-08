import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { Staffs_list_dats_type, staffs_list_type } from '@apis/staffsAPIs';
import { MemberIcon } from '@assets/icons/indexIcons';
import { StaffsEditModal } from '@components/center/staff/StaffsEditModal';
import { Button } from '@components/common/Button';
import { useSwrData } from '@hooks/apis/useSwrData';
import { DetailButton } from '@styles/common/buttonStyle';
import { BasicContainer, ListWrap } from '@styles/common/wrapStyle';
import { StaffsTop } from '@styles/pages/staffListStyle';

export const StaffsList = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useSwrData<staffs_list_type>(`staffs${window.location.search}`);
  const [searchParams, setSearchParams] = useSearchParams();
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
      <BasicContainer>
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
        <ListWrap>
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
              data?.datas.map((v: Staffs_list_dats_type) => {
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
                      <MemberIcon /> <span>{name}</span>
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
        </ListWrap>
      </BasicContainer>
      {isOpen && <StaffsEditModal id={editId} setIsOpen={setIsOpen} />}
    </>
  );
};

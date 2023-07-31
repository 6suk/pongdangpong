import React, { useCallback, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

import { mutate } from 'swr';

import { Button } from '@components/common/Button';
import { useSwrData } from '@hooks/apis/useSwrData';

import { MembersAddTicekt } from './MembersAddTicekt';
import { MembersAlbum } from './MembersAlbum';
import { MembersDetailComponent } from './MembersDetail';
import { MembersRecord } from './MembersRecord';
import { MembersResgier } from './MembersRegister';

interface UserListProps {
  [key: string]: string;
}
const Members = () => {
  const [id, setId] = useState(0);

  const navigation = useNavigate();

  const location = useLocation();
  const len = 100;
  const pathSlice = location.pathname.split('/');
  const currentPathname = pathSlice[pathSlice.length - 1];

  const { data, isLoading } = useSwrData(`members?page=1&size=${len}&sort=createdAt%2CDesc`);
  const { datas } = data ?? ({} as UserListProps);

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

  const { data: ticketData } = useSwrData('tickets') ?? {};

  useEffect(() => {
    (async () => {
      mutate(`members?page=1&size=${len}&sort=createdAt%2CDesc`);
    })();
  });

  return (
    <div style={{ paddingTop: '40px' }}>
      {currentPathname === 'register' && <MembersResgier />}
      {currentPathname === 'detail' && <MembersDetailComponent id={id} tickets={ticketData?.tickets} />}
      {currentPathname === 'record' && <MembersRecord />}
      {currentPathname === 'album' && <MembersAlbum />}
      {currentPathname === 'addTicket' && <MembersAddTicekt id={id} members={datas} tickets={ticketData?.tickets} />}

      {location.pathname === '/members' && !isLoading && (
        <>
          <form action="">
            <select id="" name="">
              <option value="등록일">등록일</option>
            </select>
            <label htmlFor="search"></label>
            <input id="search" name="search" placeholder="회원/멤버 이름, 연락처로 검색하세요" type="search" />
          </form>
          <Button
            onClick={() => {
              navigation('register');
            }}
          >
            회원 등록
          </Button>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>전체 회원{datas.length}</h2>
          {datas
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
                      type="button"
                      onClick={() => {
                        console.log(datas[idx]);

                        setId(datas[idx].id);

                        navigation('detail');
                      }}
                    >
                      상세 보기
                    </Button>
                  </li>
                </S.list>
              );
            })}
        </>
      )}
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
};

export default Members;

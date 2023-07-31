import React, { useEffect, useState, useCallback } from 'react';

import styled from 'styled-components';
import { mutate } from 'swr';

import { Button } from '@components/common/Button';
import { Modal, ModalButton } from '@components/common/Modal';
import { useRequests } from '@hooks/apis/useRequests';

import { useSwrData } from '@hooks/apis/useSwrData';

interface UserListProps {
  [key: string]: string;
}

export const MembersRecord = () => {
  const len = 100;
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    birthDate: '',
    sex: '',
    phone: '',
    job: '',
  });

  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useSwrData(`members?page=1&size=${len}&sort=createdAt%2CDesc`);
  const { datas } = data ?? ({} as UserListProps);

  const { request } = useRequests();

  const { id, name, phone, birthDate, sex, job } = userData;
  const userDataArr = [id, name, phone, birthDate, sex];

  const editMember = useCallback(async () => {
    try {
      await request({
        url: `members/${id}`,
        method: 'put',
        body: userData,
      });
    } catch (error) {
      console.error(error);
    }
  }, [userData]);

  const userDataKeys = Object.keys(userData);

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
    // 서버 렌더링 후 화면에 결과 표시
    (async () => {
      mutate(`members?page=1&size=${len}&sort=createdAt%2CDesc`);
    })();
  });

  return (
    <>
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          {
            <>
              <ul>
                {userDataArr.map((el, i) => {
                  return (
                    el !== userData.id && (
                      <li key={userDataKeys[i]}>
                        <input
                          defaultValue={userDataArr[i]}
                          id={userDataArr[i]}
                          name={userDataKeys[i]}
                          type="text"
                          onChange={({ target }) => {
                            setUserData({
                              ...userData,
                              [userDataKeys[i]]: target.value,
                            });
                          }}
                        />
                      </li>
                    )
                  );
                })}
              </ul>
              <div className="btn-wrap">
                <ModalButton $isPrimary={false} onClick={() => setIsOpen(false)}>
                  취소
                </ModalButton>
                <ModalButton
                  $isPrimary={true}
                  onClick={() => {
                    setIsOpen(false);

                    editMember();
                  }}
                >
                  확인
                </ModalButton>
              </div>
            </>
          }
        </Modal>
      )}
      {!isLoading && (
        <>
          <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>회원정보</h2>

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

                        setUserData(datas[idx]);
                        console.log(userData);

                        setIsOpen(true);
                      }}
                    >
                      수정
                    </Button>
                  </li>
                </S.list>
              );
            })}
        </>
      )}
    </>
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

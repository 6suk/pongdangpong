import React, { useState, useCallback, memo, useEffect } from 'react';

import styled from 'styled-components';

import { Button } from '@components/common/Button';
import { Modal, ModalButton } from '@components/common/Modal';

import { useRequests } from '@hooks/apis/useRequests';
import { useSwrData } from '@hooks/apis/useSwrData';

interface UserListProps {
  [key: string]: string;
}

const MembersDetail = ({ id }) => {
  const url = `members/${id}`;

  const { data, isLoading, isError } = useSwrData(url);

  const [isOpen, setIsOpen] = useState(false);

  const { name, birthDate, phone, sex }: UserListProps = data ?? {};

  const dataArr = [name, birthDate, phone, sex];
  const dataStr = ['name', 'birthDate', 'phone', 'sex'];
  const dataStrKor = ['이름', '생일', '전화번호', '성별'];

  const [userData, setUserData] = useState({
    ...data,
  });
  const { request } = useRequests();

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
  }, [id, userData]);

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
    console.log(userData);
  }, [userData]);

  return (
    !isLoading &&
    id && (
      <div>
        {isOpen && (
          <Modal setIsOpen={setIsOpen}>
            {
              <>
                <ul>
                  {dataArr.map((el, i) => {
                    return (
                      <li key={dataStr[i]}>
                        <span style={{ color: 'gray ' }}>{dataStrKor[i]}</span>
                        <input
                          defaultValue={dataArr[i]}
                          id={dataArr[i]}
                          name={dataStr[i]}
                          type="text"
                          onChange={({ target }) => {
                            setUserData({
                              ...data,
                              [dataStr[i]]: target.value,
                            });
                          }}
                        />
                      </li>
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
        <S.list key={data.id}>
          <li>
            <div className="pic">
              <img alt="profile" src="/imgs/profile.png" />
            </div>
            <p>
              <span>이름</span>
              {data.name}
            </p>
            <p>
              <span>생년월일</span>
              {dataChange('birthDate', data.birthDate)}
            </p>
            <p>
              <span>등록일</span>
              {dataChange('createdAt', data.createdAt)}
            </p>
            <p>
              <span>성별</span>
              {dataChange('sex', data.sex)}
            </p>
            <p>
              <span>전화번호</span>
              {dataChange('phone', data.phone)}
            </p>
          </li>
          <li className="btn-wrap">
            <Button
              type="button"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              수정
            </Button>
          </li>
        </S.list>
      </div>
    )
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

export const MembersDetailComponent = memo(MembersDetail);

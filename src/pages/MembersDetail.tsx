import React, { useCallback } from 'react';

// import { useRequests } from '@hooks/apis/useRequests';
import styled from 'styled-components';

import { useSwrData } from '@hooks/apis/useSwrData';

interface UserListProps {
  [key: string]: string;
}

export const MembersDetail = ({ id }) => {
  const url = `members/${id}`;
  const { data, isLoading, isError } = useSwrData(url);

  console.log(data);

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

  // const editMember = useCallback(async () => {
  //   try {
  //     await request({
  //       url: `members/${memberId}`,
  //       method: 'put',
  //       body: {
  //         name: '형진짱짱맨',
  //         birthDate: '2023-07-29',
  //         phone: 'string',
  //         sex: 'MALE',
  //         job: 'string',
  //         acquisitionFunnel: 'string',
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  return (
    (!isLoading && id ) && (
      <div>
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
    border: 1px solid gray;
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

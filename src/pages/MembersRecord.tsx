import React, { useEffect, useState } from 'react';

import { useSwrData } from '@hooks/apis/useSwrData';

interface UserListProps {
  [key: string]: string;
}

export const MembersRecord = () => {
  const [userList, userListSet] = useState([]);
  const len = 100;
  const { data, isLoading } = useSwrData(`members?page=1&size=${len}&sort=createdAt%2CDesc`);
  const { datas } = data ?? ({} as UserListProps);

  useEffect(() => {
    console.log(datas);

    userListSet(datas);
  }, [datas]);

  return (
    !isLoading &&
    userList?.reverse().map(({ id, name, phone, sex, birthDate, createdAt }: UserListProps, idx: number) => {
      return (
        <div key={idx} style={{ display: 'flex' }}>
          <p>{id}</p>
          <p>{name}</p>
          <p>{phone}</p>
          <p>{sex}</p>
          <p>{birthDate}</p>
          <p>{createdAt}</p>
        </div>
      );
    })
  );
};

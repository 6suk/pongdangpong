import React from 'react';

import { useSwrData } from '@hooks/apis/useSwrData';

export const MembersAlbum = () => {
  const id = 100;
  const url = `members/${id}/medias`;

  const { data } = useSwrData(url);
  const { datas, message, meta } = data ?? {};

  console.log(datas, message, meta);

  return (
    <div>
      데이터 {datas && '없음'} <br></br>
      메세지 {message}
      <ul>
        <li>{meta?.totalCount}</li>
        <li>{meta?.size}</li>
        <li>{meta?.count}</li>
        <li>{meta?.page}</li>
        <li>{meta?.hasMore}</li>
      </ul>
    </div>
  );
};

import { useEffect, useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import { MemberListDatasType, MemberListResponse } from '@apis/membersAPIs';

import { MemberListitem } from './MemberListItem';

interface MemberListDefaultType {
  data: MemberListResponse;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
  setRequestPath: React.Dispatch<React.SetStateAction<string>>;
}

export const MemberListDefault = ({
  data: {
    datas,
    meta: { totalCount },
  },
  setTotalCount,
  setRequestPath,
}: MemberListDefaultType) => {
  const { pathname, search } = useLocation();
  const members = useMemo(() => datas, [datas]) as MemberListDatasType[];

  // searchParams이 바뀔때 마다 RequestPath 변경
  useEffect(() => {
    setRequestPath(`${pathname}${search}`);
  }, [search]);

  // totalCount 세팅
  useEffect(() => {
    setTotalCount(totalCount);
  }, [totalCount]);

  return (
    <>
      {members.map((member: MemberListDatasType) => {
        return <MemberListitem key={member.id} member={member} />;
      })}
    </>
  );
};

import { useEffect, useMemo } from 'react';

import { MemberListDatasType } from '@apis/types/membersTypes';

import { SearchResponse } from '@apis/types/searchTypes';

import { MemberListitem } from './MemberListItem';

interface MemberListSearchPropsType {
  data: SearchResponse;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
  query: {
    currentPage: number;
    itemsPerPage: number;
  };
}

export const MemberListSearch = ({ data, setTotalCount, query }: MemberListSearchPropsType) => {
  const { currentPage, itemsPerPage } = query;
  const members = useMemo(() => data.members, [data]) as MemberListDatasType[];
  const currentData = members.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // totalCount 세팅
  useEffect(() => {
    setTotalCount(members.length);
  }, [members]);

  return (
    <>
      {currentData.map((member: MemberListDatasType) => {
        return <MemberListitem key={member.id} member={member} />;
      })}
    </>
  );
};

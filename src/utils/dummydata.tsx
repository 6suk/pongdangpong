import { MemberSearchType } from '@apis/schedulesAPIs';

/** 모달 페이지네이션 테스트용 더미테이터 */
export const dummyData = (count: number): MemberSearchType[] => {
  const dummy = [];

  for (let i = 1; i <= count; i++) {
    dummy.push({
      id: i,
      name: '김통증' + i,
      phone: 'string',
      sex: 'MALE',
      birthDate: '2023-07-27',
      createdAt: '2023-07-27T15:06:00',
      updatedAt: '2023-08-03T12:27:59',
      visitedAt: '2023-07-27T15:05:59.855199',
    } as MemberSearchType);
  }

  return dummy;
};

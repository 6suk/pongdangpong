import { useState } from 'react';

import counselingData from '@/data/counseling_dummy_data.json';
import memberData from '@/data/member_dummy_data.json';
import userData from '@/data/user_dummy_data.json';
import axiosInstance from '@apis/axiosInstance';
import { Button } from '@components/common/Button';

const memberIdArr = [
  80, 82, 84, 87, 88, 89, 90, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
  111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133,
  134, 135, 141, 142, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164,
  174, 180, 181, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203,
  204, 205, 206, 207, 208, 209, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 231, 232, 242, 243, 244, 245, 246,
  247, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280,
  286, 287, 290, 291, 292,
];

const userIdArr = [
  1, 33, 48, 49, 50, 51, 52, 53, 54, 55, 56, 66, 70, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 88, 89, 90,
  91, 92,
];

const counselingId = [
  167, 168, 169, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 188, 194, 195, 209, 211, 212, 218, 219, 220, 223,
  229, 241, 242, 244, 246, 248, 265, 267, 268, 270, 271, 272, 290, 291, 293, 301, 302, 303, 304, 305, 306, 307, 308,
  309, 310, 312, 313,
];

/** 회원 / 직원 정보 더미데이터 put - (완료) */
export const PutDummyData = () => {
  const [dummy, setDummy] = useState<object[]>([]);

  const putMembersOrUsersDummyData = (type: 'members' | 'staffs' | 'schedules/counseling') => {
    let arr: number[] = [];

    return () => {
      switch (type) {
        case 'staffs':
          arr = userIdArr;
          setDummy(userData);
          break;
        case 'members':
          arr = memberIdArr;
          setDummy(memberData);
          break;
        case 'schedules/counseling':
          arr = counselingId;
          setDummy(counselingData);
          break;
      }

      const check = confirm('넣으실?');
      if (check) {
        arr.forEach(async (id, index) => {
          try {
            const url = `${type}/${id}`;
            const body = dummy[index];
            const response = await axiosInstance.put(url, body);
            console.log(`${id} 등록 완료`);
          } catch (error) {
            console.error(`${id} 등록 실패: ${error}`);
          }
        });
      }
    };
  };

  return (
    <>
      <Button type="button" onClick={putMembersOrUsersDummyData('members')}>
        회원 더미데이터 PUT
      </Button>
      <Button type="button" onClick={putMembersOrUsersDummyData('staffs')}>
        직원 더미데이터 PUT
      </Button>
      <Button type="button" onClick={putMembersOrUsersDummyData('schedules/counseling')}>
        상담 더미데이터 PUT
      </Button>
      <div>{JSON.stringify(dummy)}</div>
    </>
  );
};

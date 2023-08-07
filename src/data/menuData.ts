import { MenuState } from '@stores/menuSlice';

export const subMenuList: MenuState = {
  home: [],
  // members: [
  //   { id: '전체 리스트', content: '전체 리스트', path: '/members', hide: false },
  //   { id: '회원 수강권 관리', content: '회원 수강권 관리', path: '/members/detail', hide: false },
  //   { id: '만족도 및 후기', content: '만족도 및 후기', path: '/members/review', hide: false },
  //   { id: '앨범', content: '앨범', path: '/members/album', hide: false },
  // ],
  center: [
    { id: '수강권 관리', content: '수강권 관리', path: '/center/tickets', hide: false },
    { id: '직원 관리', content: '직원 관리', path: '/center/staffs', hide: false },
    { id: '센터 정보', content: '센터 정보', path: '/center/info', hide: false },
  ],
};

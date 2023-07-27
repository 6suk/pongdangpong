export const subMenuList = {
  home: [],
  schedule: [
    { id: '수강권 관리', content: '수강권 관리', path: '/schedule/ticketManagement', hide: true },
    { id: '회원 수정', content: '회원 수정', path: '/schedule/member', hide: true },
  ],
  members: [
    { id: '기록지', content: '기록지', path: '/members/record', hide: false },
    { id: '만족도 및 후기', content: '만족도 및 후기', path: '/members/review', hide: false },
    { id: '앨범', content: '앨범', path: '/members/album', hide: false },
  ],
  center: [
    { id: '수강권 관리', content: '수강권 관리', path: '/center/tickets', hide: false },
    { id: '직원 관리', content: '직원 관리', path: '/', hide: false },
    { id: '기록관리', content: '기록관리', path: '/', hide: false },
  ],
  mypage: [],
  me: [
    { id: '티켓 리스트', content: '티켓 리스트', path: '/sample/list', hide: false },
    { id: '티켓 생성', content: '티켓 생성', path: '/sample/create', hide: false },
  ],
};

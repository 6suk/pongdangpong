export const subMenuList = {
  home: [
    { id: '홈', content: '홈', path: '/', hide: false },
    { id: '내 정보 보기', content: '내 정보 보기', path: '/me', hide: false },
  ],
  schedule: [{ id: '회원 수정', content: '회원 수정', path: '/schedule/member', hide: true }],
  members: [
    { id: '회원 수강권 관리', content: '회원 수강권 관리', path: '/members/sampleEdit', hide: false },
    { id: '회원 수정', content: '회원 수정', path: '/members/edit', hide: false },
    { id: '기록지', content: '기록지', path: '/members/record', hide: false },
    { id: '만족도 및 후기', content: '만족도 및 후기', path: '/members/review', hide: false },
    { id: '앨범', content: '앨범', path: '/members/album', hide: false },
  ],
  center: [],
  mypage: [],
  me: [
    { id: '티켓 리스트', content: '티켓 리스트', path: '/sample/list', hide: false },
    { id: '티켓 생성', content: '티켓 생성', path: '/sample/create', hide: false },
  ],
};

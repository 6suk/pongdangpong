export const subMenuList ={  
  home: [
    {id:1, content:"홈", path:"/"},
    {id:2, content: "내 정보 보기" , path:"/me"},
  ],
  schedule:[
    {id:"수강권 관리", content: "수강권 관리" , path:"/schedule/management" , hide:false}, 
    {id:"회원 수정", content: "회원 수정" , path:"/schedule/member" ,  hide: true}, 
    {id:"기록지", content: "기록지" , path:"/schedule/record" ,hide: false}, 
    {id:"만족도 및 후기", content: "만족도 및 후기" , path:"/schedule/review" ,hide: false}, 
    {id:"앨범", content: "앨범" , path:"/schedule/album" , hide: false}, 
  ],
  members:[

  ],
  center:[
    
  ],
  mypage:[

  ],
  me:[
    
  ],
  tickets: [
    {id:"티켓 리스트", content: "티켓 리스트" , path:"/tickets/list"},
    {id:"티켓 생성", content: "티켓 생성" , path:"/tickets/create"},
  ],
}
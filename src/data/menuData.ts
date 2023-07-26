export const subMenuList ={  
  home: [
    {id:1, content:"홈", path:"/"},
    {id:2, content: "내 정보 보기" , path:"/me"},
  ],
  schedule:[
    {id:"수강권 관리", content: "수강권 관리" , path:"/schedule/ticketManagement" , hide:true}, 
    {id:"회원 수정", content: "회원 수정" , path:"/schedule/member" ,  hide: true}, 
  ],
  members:[
    {id:"기록지", content: "기록지" , path:"/members/record" ,hide: false}, 
    {id:"만족도 및 후기", content: "만족도 및 후기" , path:"/members/review" ,hide: false}, 
    {id:"앨범", content: "앨범" , path:"/members/album" , hide: false},     
  ],
  center:[
    
  ],
  mypage:[

  ],
  me:[
    {id:"티켓 리스트", content: "티켓 리스트" , path:"/tickets/list"},
    {id:"티켓 생성", content: "티켓 생성" , path:"/tickets/create"},
  ],
}
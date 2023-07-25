import { useState } from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { Home,Schedule, Member, Center, Mypage} from '@assets/icons/indexIcons.tsx';

export const GlobalNavigation = () => {

  const [active, setActive] = useState()

  const activeTarget = (i:any) => ()=> setActive(i);

  const data =[
    {id:"Home", icon: <Home/> , link:"/"},
    {id:"schedule", icon: <Schedule/> ,link:"/"},
    {id:"Member", icon: <Member /> ,link:"/"},
    {id:"Center", icon: <Center/> ,link:"/"},
    {id:"Mypage", icon: <Mypage/> , link:"/"},
  ]

  return (
    <S.globalNav>
      <ul>
      {
        data.map(({id, icon, link}, i)=>{
          return(
            <li key={id} className={active === i ? "on" : ""}>
            <Link to={link} onClick={activeTarget(i)}>{icon}</Link>
          </li>
          )
        })
      }
      </ul>
    </S.globalNav>
  )
}

const S = {
  globalNav: styled.div`
      width: 100%;
      height: 94px;
      position: fixed;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-top: 2px solid #E7E7E7;
      
      & > ul{
        width: 100%;
        max-width: 540px;
        display: flex;
        justify-content: space-between;

        & > li > a  > svg{
          transition: all .4s;
          fill: gray;
        }

        & > li.on > a  > svg{          
            fill: royalblue;            
        }
      }   
  `
}
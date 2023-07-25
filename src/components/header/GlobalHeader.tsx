import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom';
import { PropsState } from '@/app/App';
import { useAuth } from '@hooks/apis/useAuth';
import { useSwrData } from '@hooks/apis/useSwrData';
import { me_info, Me_info_response } from '@apis/meApis';
import { Notifications } from '@assets/icons/indexIcons';
import theme from '@styles/theme';


export const GlobalHeader: React.FC<PropsState> = (props) =>{
  const {isLogin} = props;

  const { url } = me_info;
  const { data } = useSwrData(url);

  const { logout } = useAuth();

  const handleLogOutClick = () => {
    logout();
  };

  const {
    name = '',
  } = data ?? ({} as Me_info_response);


  return (
    <S.header>
      <div className="container">
      <h1 className='logo'>
        <Link to={"/"}>
            <img src="/imgs/logo.png" alt="로고" />
        </Link>
      </h1>

      <S.nav theme={theme}>
        <ul>
          <li className="user">
            {isLogin ? 
              <> 
              <div className="pic">
                <img src="/imgs/profile.png" alt="프로필 사진" />
              </div>
              <span className='userName'>
                {name} 님 
              </span>
              <button type="button" onClick={handleLogOutClick} style={{cursor:"pointer"}} >          
                로그아웃      
              </button>
              <Notifications onClick={()=>{

              }} style={{cursor:"pointer"}}/>
              </> 
              : 
              <div>비로그인 상태</div>}
          </li>
        </ul>
      </S.nav>
      </div>
    </S.header>
  )
} 

const S = {
  header: styled.header`
      width: 100%;
      height: 80px;
      background-color: #fff;
      border-bottom: 2px solid #E7E7E7;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 999;
      
      & > .container{
        width: 100%;
        max-width: 1280px;
        height: 100%;
        margin: 0 auto;
        display: flex;
         align-items: center;
        justify-content: space-between;
    }
  `,
  nav: styled.nav`
  
    .user{
      height: 100%;
      display: flex;
      align-items: center;

      .pic{
        display: flex;
        height: 100%;
        align-items: center;
        margin-right: 8px;
      }

      .userName{
        margin-right: 14px;
      }

      button{
        padding: 6px 20px;
        background-color: ${({theme})=> theme.colors["Gray-800"]};
        color: ${({theme})=> theme.colors["Pri-400"]};
        border-radius: 6px;
        margin-right: 40px;
        position: relative;
        transition: all .4s;

        &:hover{
          background-color: ${({theme})=> theme.colors["Pri-400"]};
           color: ${({theme})=> theme.colors["Gray-800"]};
        }

        &::after{
          display: block;
          position: absolute;
          right: -26px;
          top: 50%;
          transform: translateY(-50%);
          content: "|";
          font-size: 2rem;
          font-weight: 100;
          color: ${({theme})=> theme.colors["Gray-700"]};
        }
      }
      
    }
      
  `
}

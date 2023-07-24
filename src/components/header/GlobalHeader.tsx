import React,{useEffect, useState} from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom';
import { PropsState } from '@/app/App';
import { useAuth } from '@hooks/apis/useAuth';
import { useSwrData } from '@hooks/apis/useSwrData';
import { me_info, Me_info_response } from '@apis/meApis';



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
    loginId = '',
    isLoading
  } = data ?? ({} as Me_info_response);

  
  useEffect(()=>{
    const {log} = console;
    
    isLogin ? log('로그인!') : log('로그아웃!');

  },[isLogin])


  return (
    <S.header>
      <div className="container">
      <h1 className='logo'>
        <Link to={"/"}>
          로고
            <img src="" alt="" />
        </Link>
      </h1>

      <nav>
        <ul>
          <li className="user">
            {isLogin ? 
            <> 
              {name}
              <button type="button" onClick={handleLogOutClick} style={{cursor:"pointer"}} >          
                로그아웃      
              </button>
            </> : <div>비로그인 상태</div>}
          </li>
       
          <li className='icon'>

          </li>
        </ul>
      </nav>
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
  `
}

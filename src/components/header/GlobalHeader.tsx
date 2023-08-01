import React, { useState, useEffect } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { styled } from 'styled-components';

import { PropsState } from '@/app/App';
import { me_info, Me_info_response } from '@apis/meApis';
import { Notifications } from '@assets/icons/indexIcons';
import { useAuth } from '@hooks/apis/useAuth';
import { useSwrData } from '@hooks/apis/useSwrData';
import theme from '@styles/theme';

export const GlobalHeader: React.FC<PropsState> = props => {
  const { isLogin } = props;

  const { url } = me_info;
  const { data } = useSwrData(url);

  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogOutClick = () => {
    logout();
  };

  const { name = '' } = data ?? ({} as Me_info_response);

  const globalMenu = [
    { id: 'Home', content: '홈', path: '/' },
    { id: 'Schedule', content: '일정관리', path: 'schedule' },
    { id: 'Schedules', content: '일정관리', path: 'schedules' },
    { id: 'Member', content: '회원관리', path: 'members' },
    { id: 'Center', content: '센터관리', path: 'center', initPath: 'center/tickets' },
    { id: 'Mypage', content: '마이페이지', path: 'me' },
  ];

  const [active, setActive] = useState('');
  const pathName = useLocation().pathname;

  const checkActive = (path: string) => {
    const target = active.split('/').filter(el => el);

    if (path === '/' && !target.length) return 'on';
    else if (target.includes(path)) return 'on';
  };

  useEffect(() => {
    setActive(pathName);
  }, [active, pathName]);

  const activeTarget = (path: string) => () => navigate(path);

  return (
    <S.header>
      <div className="container">
        <h1 className="logo">
          <Link to={'/'}>
            <img alt="로고" src="/imgs/logo.png" />
          </Link>
        </h1>

        <S.nav theme={theme}>
          <S.menu>
            {isLogin &&
              globalMenu.map(({ id, content, path, initPath }) => {
                return (
                  <li key={id} className={checkActive(path)} onClick={activeTarget(initPath ? initPath : path)}>
                    {content}
                  </li>
                );
              })}
          </S.menu>

          <ul>
            <li className="user">
              {isLogin ? (
                <>
                  <div className="pic">
                    <img alt="프로필 사진" src="/imgs/profile.png" />
                  </div>
                  <span className="userName">{name} 님</span>
                  <button style={{ cursor: 'pointer' }} type="button" onClick={handleLogOutClick}>
                    로그아웃
                  </button>
                  <Notifications style={{ cursor: 'pointer' }} />
                </>
              ) : (
                <div>비로그인 상태</div>
              )}
            </li>
          </ul>
        </S.nav>
      </div>
    </S.header>
  );
};

const S = {
  header: styled.header`
    width: 100%;
    height: 80px;
    background-color: #fff;
    border-bottom: 2px solid #e7e7e7;
    position: sticky;
    left: 0;
    top: 0;
    z-index: 999;

    & > .container {
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
    width: 100%;
    margin-left: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user {
      height: 100%;
      display: flex;
      align-items: center;

      .pic {
        display: flex;
        height: 100%;
        align-items: center;
        margin-right: 8px;
      }

      .userName {
        margin-right: 14px;
      }

      button {
        padding: 6px 20px;
        background-color: ${({ theme }) => theme.colors['Gray-800']};
        color: ${({ theme }) => theme.colors['Pri-400']};
        border-radius: 6px;
        margin-right: 40px;
        position: relative;
        transition: all 0.4s;

        &:hover {
          background-color: ${({ theme }) => theme.colors['Pri-400']};
          color: ${({ theme }) => theme.colors['Gray-800']};
        }

        &::after {
          display: block;
          position: absolute;
          right: -26px;
          top: 50%;
          transform: translateY(-50%);
          content: '|';
          font-size: 2rem;
          font-weight: 100;
          color: ${({ theme }) => theme.colors['Gray-700']};
        }
      }
    }
  `,
  menu: styled.ul`
    display: flex;

    & > li {
      margin: 0 14px;
      cursor: pointer;
      position: relative;

      &.on {
        color: ${({ theme }) => theme.colors['Pri-400']};
        font-weight: 600;
      }
    }
  `,
};

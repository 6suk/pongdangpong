import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

import { MeType } from '@apis/authAPIs';
import { Logo, Notifications } from '@assets/icons/indexIcons';
import { useAuth } from '@hooks/apis/useAuth';
import { RootState } from '@stores/store';
import theme from '@styles/theme';

export const GlobalHeader = () => {
  const data = useSelector((state: RootState) => state.tokens.user) as MeType;
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogOutClick = () => {
    logout();
  };

  const globalMenu = [
    { id: 'Home', content: '홈', path: '/' },
    { id: 'Schedules', content: '일정관리', path: 'schedules' },
    { id: 'Member', content: '회원관리', path: 'members' },
    { id: 'Center', content: '센터관리', path: 'center', initPath: 'center/tickets' },
    { id: 'Mypage', content: '마이페이지', path: 'mypage' },
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
            <Logo />
          </Link>
        </h1>

        <S.nav theme={theme}>
          <S.menu>
            {data &&
              globalMenu.map(({ id, content, path, initPath }) => {
                return (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                  <li key={id} className={checkActive(path)} onClick={activeTarget(initPath ? initPath : path)}>
                    {content}
                  </li>
                );
              })}
          </S.menu>

          <ul>
            <li className="user">
              {data ? (
                <>
                  <div className="pic">
                    <img alt="프로필 사진" src="/imgs/profile.png" />
                  </div>
                  <span className="userName">{data.name} 님</span>
                  <button type="button" onClick={handleLogOutClick}>
                    로그아웃
                  </button>
                  <Notifications style={{ cursor: 'pointer', width: '20px' }} />
                </>
              ) : (
                <div></div>
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
    border-bottom: 1px solid #e7e7e7;
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

    .logo {
      svg {
        height: 25px;
        width: auto;
      }
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
        padding: 6px 12px;
        background-color: ${({ theme }) => theme.colors['Gray-800']};
        color: ${({ theme }) => theme.colors['Pri-400']};
        border-radius: 6px;
        margin-right: 40px;
        position: relative;
        transition: all 0.4s;
        font-size: ${theme.font.sub};

        &:hover {
          background-color: ${theme.colors.gray[700]};
          font-weight: 600;
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

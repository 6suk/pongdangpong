import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { styled } from 'styled-components';

import { PropsState } from '@/app/App';
import { TicketMenuItem } from '@stores/menuSlice';

import theme from '@styles/theme';

export const SubHeader: React.FC<PropsState> = (props) => {

  const {isLogin} = props;

  const [active, setActive] = useState("");
  const [headerActive, headerActiveSet] = useState('');

  const menuState = useSelector((state: any) => state.menu);

  const pathName = useLocation().pathname;

  const pathTarget = (() => {
    if (pathName === '/') return 'home';
    else return pathName.split('/')[1];
  })();

  useEffect(() => {
    isLogin && menuState[pathTarget] && headerActiveSet('on');
    (!isLogin || !menuState[pathTarget]?.length) && headerActiveSet('');
    menuState[pathTarget]?.find((el: any) => el.path === pathName)?.hide && headerActiveSet('');
  }, [isLogin, pathName]);

  return (
    <>
      <S.subheader className={headerActive} theme={theme}>
        <div className="wrap">
          {menuState[pathTarget]?.map(({ id, content, path }: TicketMenuItem) => {
            return (
              <li key={id} className={pathName === path || path.split('/')[2] === pathName.split('/')[2] ? 'on' : ''}>
                <Link to={path}>{content}</Link>
              </li>
            );
          })}
        </div>
      </S.subheader>
    </>
  );
};

const S = {
  subheader: styled.ul`
    width: 100%;
    height: 64px;
    background-color: #fff;
    border-bottom: 2px solid #e7e7e7;
    position: fixed;
    left: 0;
    top: -22%;
    transition: all 0.54s cubic-bezier(0.62, -0.12, 0.39, 1.19);

    &.on {
      top: 80px;
    }

    .wrap {
      height: 100%;
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;

      li {
        position: relative;
        margin: 0 20px;

        &::after {
          display: block;
          content: '';
          position: absolute;
          left: 0;
          bottom: -88%;
          width: 0;
          height: 3px;
          background-color: ${({ theme }) => theme.colors['Pri-400']};
          transition: width 0.6s;
        }

        &.on {
          color: ${({ theme }) => theme.colors['Pri-400']};
          font-weight: 600;

          &::after {
            width: 100%;
          }
        }
      }
    }
  `,
};

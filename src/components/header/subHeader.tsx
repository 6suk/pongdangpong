import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { PropsState } from '@/app/App';
import theme from '@styles/theme';
import { useSelector } from 'react-redux';
import { TicketMenuItem } from '@stores/menuSlice'

export const SubHeader: React.FC<PropsState> = (props) => {

  const {isLogin} = props;
  
  const [active, setActive] = useState(0);
  const [headerActive, headerActiveSet] = useState('');

  const state = useSelector((state:any) => state.menu);
  
  const activeTarget = (idx:number) => () => setActive(idx); 

  useEffect(()=>{
      isLogin && headerActiveSet('on');
      !isLogin && headerActiveSet('');
  },[isLogin])


  return (
    <>
    <S.subheader className={headerActive} theme={theme}>
      <div className="wrap">        
        {
          // 어떤 메뉴를 출력할것인지 넣어주면 해당 메뉴출력
          state["ticketMenu"].map(({id, content, path} : TicketMenuItem , i: number)=>{
              return(
              <li key={id} className={active === i ? "on" : ""}>
                <Link to={path} onClick={activeTarget(i)}>
                  {content}
                </Link>
              </li>)}                  
          )
        }
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
      border-bottom: 2px solid #E7E7E7;
      position: fixed;
      left: 0;
      top: -22%;
      transition: all .54s cubic-bezier(0.62, -0.12, 0.39, 1.19);

      &.on{
        top: 80px;
      }
  
      .wrap{
        height: 100%;
        max-width: 1280px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;

        li {
          position: relative;
          margin: 0 20px;

          &::after{
            display: block;
            content:'';
            position: absolute;
            left: 0;
            bottom: -88%;
            width: 0;
            height: 3px;
            background-color: ${({theme})=> theme.colors["Pri-400"]};
            transition: width 0.6s;
          }
          
          &.on{
            color: ${({theme})=> theme.colors["Pri-400"]};
            font-weight: 600;

            &::after{
              width: 100%;
            }
          }
        }
      }
    `
}


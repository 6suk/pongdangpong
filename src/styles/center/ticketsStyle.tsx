import { styled } from 'styled-components';

import theme from '@styles/theme';

/** Contents Container */
export const TicketContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
`;
export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
`;

/** ...인 수강권이 없습니다 */
export const NoneDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  justify-content: center;
  margin-top: 3rem;

  .none-d-icon {
    background-color: ${theme.colors.gray[800]};
    padding: 30px;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;
  }

  svg {
    width: 90px;
    fill: ${theme.colors.gray[600]};
  }
  .text {
    color: ${theme.colors.gray[500]};
  }
`;

/** Top (search / title ...) */
export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-block: 2rem;
  align-items: center;
  margin-inline: 1rem;
  align-items: flex-end;

  .ticket-active {
    display: flex;

    a {
      font-size: ${theme.font.sub};
      color: ${theme.colors.gray[500]};
      padding: 12px;
      border-bottom: 2px solid ${theme.colors.gray[600]};
    }

    .on {
      font-weight: 600;
      color: ${theme.colors.pri[500]};
      border-bottom: 2px solid ${theme.colors.pri[300]};
    }
  }

  .issued-title {
    display: flex;
    gap: 0.2rem;
    align-items: flex-end;

    h3 {
      font-size: ${theme.font.subTitle};
      font-weight: 800;
    }

    p {
      color: ${theme.colors.gray[300]};
    }
  }
`;

/** Ticket 컴포넌트 부모요소 */
export const TicketWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(430px, 480px));
  gap: 2rem;
  justify-content: center;
  padding-inline: 1rem;
`;

/** 티켓 컴포넌트 스타일 정의 */
export const TS = {
  Ticket: styled.div<{ $isActive: boolean }>`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    aspect-ratio: 12/6;
    border: 1px solid ${theme.colors.gray[700]};
    border-radius: 10px;
    overflow: hidden;

    * {
      color: ${props => !props.$isActive && `${theme.colors.gray[500]} !important`};
    }
    .ticket-left {
      background-color: ${props => !props.$isActive && `${theme.colors.gray[800]} !important`};
    }
    .ticket-right button {
      background-color: ${props => !props.$isActive && `${theme.colors.gray[700]} !important`};
      color: ${props => !props.$isActive && `${theme.colors.gray[400]} !important`};

      &:hover {
        background-color: ${props => !props.$isActive && `${theme.colors.gray[600]} !important`};
      }
    }
    .tag,
    .icon {
      background-color: ${props => !props.$isActive && `${theme.colors.gray[700]} !important`};

      svg {
        width: 24px;
        height: auto;
        fill: ${props => (props.$isActive ? `${theme.colors.pri[700]}` : `${theme.colors.gray[800]}`)};
      }
    }
  `,

  TicketLeft: styled.div`
    box-sizing: border-box;
    display: flex;
    flex: 6.5;
    justify-content: space-between;
    flex-direction: column;
    padding: 1.5rem;
  `,

  LeftTitle: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .title {
      max-width: 210px;
      display: flex;
      gap: 0.5rem;
      flex-direction: column;
      overflow: hidden;
      min-width: 0;

      h3 {
        font-weight: 700;
        font-size: ${theme.font.body};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
      }

      .tag {
        font-size: ${theme.font.sm};
        padding-block: 0.2rem;
        padding-inline: 0.5rem;
        border-radius: 5px;
        background-color: ${theme.colors.pri[900]};
        color: ${theme.colors.pri[500]};
        width: fit-content;
      }
    }

    .icon {
      flex-shrink: 0;
      background-color: ${theme.colors.pri[900]};
      padding: 10px; // This controls the size of the circle
      border-radius: 50%; // This makes it round
      display: inline-flex; // This helps center the image in the circle
      justify-content: center;
      align-items: center;
      aspect-ratio: 1 / 1;

      img {
        width: 100%; // Fill the parent
      }
    }
  `,

  LeftInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-size: ${theme.font.sub};

    dl {
    }

    dt,
    dd {
      display: inline-block;
    }

    dt {
      width: 100px;
      color: ${theme.colors.gray[500]};
    }
  `,

  TicketRight: styled.div`
    box-sizing: border-box;
    flex: 3.5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    font-size: ${theme.font.sub};
    border-left: 1px solid ${theme.colors.gray[700]};
    min-width: 0;
    flex-shrink: 0;

    button {
      flex: 1;
      width: 100%;
      background-color: ${theme.colors.pri[900]};
      color: ${theme.colors.pri[400]};
      transition: all 0.4s;
    }

    button:hover {
      background-color: ${theme.colors.pri[800]};
      font-weight: 600;
    }
  `,
};

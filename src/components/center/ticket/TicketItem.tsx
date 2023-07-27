import { styled } from 'styled-components';

import { LessonTypeEnum, TermUnitEnum, Ticket_response } from '@apis/ticketsAPIs';
import { TicketIcon } from '@assets/icons/indexIcons';

import { theme } from '@styles/theme';

interface TicketItemProps {
  ticket: Ticket_response;
}

export const TicketItem = ({ ticket }: TicketItemProps) => {
  const {
    id,
    title,
    lessonType,
    isActive,
    issuedTicketCount = 0,
    defaultCount = 0,
    dailyCountLimit = 0,
    defaultTerm = 0,
    defaultTermUnit,
  } = ticket;
  return (
    <>
      <TS.Ticket $isActive={isActive}>
        <TS.TicketLeft className="ticket-left">
          <TS.LeftTitle>
            <div className="title">
              <h3>{title}</h3>
              <p className="tag">{LessonTypeEnum[lessonType]}</p>
            </div>
            <div className="icon">
              <TicketIcon />
            </div>
          </TS.LeftTitle>
          <TS.LeftInfo>
            <dl>
              <dt>부여</dt>
              <dd>{`${issuedTicketCount}건`}</dd>
            </dl>
            <dl>
              <dt>수강권 횟수</dt>
              <dd>{`${defaultCount}회`}</dd>
            </dl>
            <dl>
              <dt>수업 시간</dt>
              <dd>{`${dailyCountLimit}분`}</dd>
            </dl>
            <dl>
              <dt>수강권 기간</dt>
              <dd>{`${defaultTerm}${TermUnitEnum[defaultTermUnit]}`}</dd>
            </dl>
          </TS.LeftInfo>
        </TS.TicketLeft>
        <TS.TicketRight className="ticket-right">
          {/* 각각 버튼에 맞는 행동 추가 */}
          <button
            type="button"
            onClick={() => {
              console.log(id + ' 수강권 부여내역 클릭');
            }}
          >
            수강권 부여내역
          </button>
          <button
            type="button"
            onClick={() => {
              console.log(id + ' 판매종료 클릭');
            }}
          >
            판매종료
          </button>
          <button
            type="button"
            onClick={() => {
              console.log(id + ' 수정/삭제');
            }}
          >
            수정 / 삭제
          </button>
        </TS.TicketRight>
      </TS.Ticket>
    </>
  );
};

export const TicketContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
`;

export const TicketWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(430px, 480px));
  gap: 2rem;
  justify-content: center;
  padding-inline: 1rem;
`;

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

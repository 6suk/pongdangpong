import { styled } from 'styled-components';

import { AttendanceHistoriesType, SchedulesIssuedTicketType, StatusEnum } from '@apis/schedulesAPIs';
import { MemberIcon } from '@assets/icons/indexIcons';
import theme from '@styles/theme';

import { StatusButton } from './StatusButton';
import { TypeInfoProps } from '../calendar/Dashboard';

export interface MemberCardItemProps {
  attendanceHistories: AttendanceHistoriesType[];
  issuedTicket: SchedulesIssuedTicketType;
}

export const MemberCardItem = ({ attendanceHistories, issuedTicket }: MemberCardItemProps) => {
  const { title, remainingCount, availableReservationCount, defaultCount } = issuedTicket;

  return (
    <>
      {attendanceHistories.map((v: AttendanceHistoriesType) => {
        const {
          id,
          member: { id: memberId, name: memberName, phone: memberPhone },
          status,
        } = v;
        return (
          <CardItem key={memberId}>
            <div className="card-top">
              <div className="top-left">
                <MemberIcon />
                <div className="name-box">
                  <p className="name">{memberName}</p>
                  <p>{memberPhone}</p>
                </div>
              </div>
              <div className="top-btns">
                <StatusButton attendanceHistoryId={id} buttonType="attendance" status={status}>
                  출석
                </StatusButton>
                <StatusButton attendanceHistoryId={id} buttonType="absence" status={status}>
                  결석
                </StatusButton>
              </div>
            </div>
            <div className="card-bottom">
              <div className="infos">
                <dl>
                  <dt>출결상태</dt>
                  <dd className="type-box">
                    <TypeInfo type={status} />
                    <p>{StatusEnum[status]}</p>
                  </dd>
                </dl>
                <dl>
                  <dt>수강권명</dt>
                  <dd>{title}</dd>
                </dl>
                <dl>
                  <dt>잔여</dt>
                  <dd>{defaultCount ? `${remainingCount}회 (총${defaultCount}회)` : '무제한'}</dd>
                </dl>
                <dl>
                  <dt>예약 가능</dt>
                  <dd>{defaultCount ? `${availableReservationCount}회 (총${defaultCount}회)` : '무제한'}</dd>
                </dl>
              </div>
            </div>
          </CardItem>
        );
      })}
    </>
  );
};

const CardItem = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* aspect-ratio: 12/6; */
  border: 1px solid ${theme.colors.gray[700]};
  border-radius: 10px;
  overflow: hidden;
  font-size: ${theme.font.sub};

  .card-top {
    padding-inline: 1.5rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-block: 1.25rem;
    flex: 3;
    align-items: center;
    border-bottom: 1px solid ${theme.colors.gray[700]};

    .top-left {
      display: flex;
      align-items: flex-start;
      gap: 0.8rem;

      svg {
        width: 1.8rem;
      }

      .name-box {
        display: flex;
        flex-direction: column;

        .name {
          font-weight: 600;
          /* font-size: ${theme.font.body}; */
        }
      }
    }
    .top-btns {
      display: flex;
      gap: 0.25rem;
    }
  }
  .card-bottom {
    padding-inline: 1.5rem;
    padding-block: 2rem;
    flex: 7;

    .type-box {
      display: flex;
      gap: 0.3rem;
    }

    .infos {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-inline: 2.6rem; // svg + gap
      dl {
        display: flex;
        gap: 1rem;

        dt {
          color: ${theme.colors.gray[400]};
          flex: 2;
        }
        dd {
          font-weight: 600;
          flex: 8;
        }
      }
    }
  }
`;

const TypeInfo = styled.p.attrs<TypeInfoProps>(() => ({}))`
  & + p {
    color: ${({ type, theme }) => {
      switch (type) {
        case 'PRESENT':
          return theme.colors.pri[500];
        case 'ABSENT':
          return theme.colors.Error;
      }
    }};
  }

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background-color: ${({ type, theme }) => {
      switch (type) {
        case 'PRESENT':
          return theme.colors.pri[500];
        case 'ABSENT':
          return theme.colors.Error;
        case 'WAIT':
          return theme.colors.gray[500];
        case 'counseling':
          return 'transparent';
        default:
          return 'transparent';
      }
    }};
    border: ${({ type }) => (type === 'counseling' ? `2px solid #4FB564` : 'none')};
  }
`;

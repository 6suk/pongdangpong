import { styled } from 'styled-components';

import { ScheduleType } from '@stores/selectedDateSlice';
import theme from '@styles/theme';

import { DAYOFWEEK_ENUM } from './Calendar';
import { DayType } from './utils/generateCalendar';

interface DashboardProps {
  selectedDay: DayType;
  sortSchedules: ScheduleType[];
}

export const Dashboard = ({ selectedDay, sortSchedules }: DashboardProps) => {
  const { year, month, date, dayOfWeek } = selectedDay;
  const formattedDate = `${year}.${month.toString().padStart(2, '0')}.${date.toString().padStart(2, '0')}(${
    DAYOFWEEK_ENUM[dayOfWeek]
  })`;
  const totalSchedules = sortSchedules.length;
  const canceledSchedules = sortSchedules.filter(item => item.schedule.isCanceled).length;
  const cancellationRate = totalSchedules > 0 ? (canceledSchedules / totalSchedules) * 100 : 0;
  const getTime = (dateTime: string) => {
    return dateTime.split('T')[1].slice(0, 5);
  };

  return (
    <>
      <DashboardWrap>
        <DashboardTop>
          <div className="selected-date">
            <h3>{formattedDate}</h3>
          </div>
          <div className="total-info">
            <dl>
              <dt>총 일정</dt>
              <dd>{totalSchedules}건</dd>
            </dl>
            <dl>
              <dt>취소 일정</dt>
              <dd>{canceledSchedules}건</dd>
            </dl>
            <dl>
              <dt>취소율</dt>
              <dd>{cancellationRate}%</dd>
            </dl>
          </div>
        </DashboardTop>
        <DashboardBottom>
          <ul className="type-info">
            <li>
              <TypeInfo type="PRESENT" />
              <TypeInfoText type="PRESENT">출석</TypeInfoText>
            </li>
            <li>
              <TypeInfo type="ABSENT" />
              <TypeInfoText type="ABSENT">결석</TypeInfoText>
            </li>
            <li>
              <TypeInfo type="WAIT" />
              <TypeInfoText type="WAIT">예약</TypeInfoText>
            </li>
            <li>
              <TypeInfo type="counseling" />
              <TypeInfoText type="counseling">상담</TypeInfoText>
            </li>
          </ul>
          <div className="table">
            <ul className="table-row title">
              <li className="type-box">출결</li>
              <li>진행시간</li>
              <li>회원명(총인원)</li>
              <li>잔여횟수</li>
            </ul>
            {sortSchedules.map((v: ScheduleType) => {
              const { type, schedule } = v;
              if ('attendanceHistories' in schedule) {
                const {
                  startAt,
                  endAt,
                  attendanceHistories,
                  issuedTicket: { availableReservationCount },
                  id,
                } = schedule;

                return (
                  <ul key={id} className="table-row">
                    <li className="type-box">
                      <TypeInfo type={schedule.attendanceHistories[0].status} />
                    </li>
                    <li>{`${getTime(startAt)} - ${getTime(endAt)}`}</li>
                    <li>{`${attendanceHistories[0].member.name} (${attendanceHistories.length})`}</li>
                    <li>{availableReservationCount}회</li>
                  </ul>
                );
              } else {
                const {
                  id,
                  startAt,
                  endAt,
                  client: { name },
                } = schedule;
                return (
                  <ul key={id} className="table-row">
                    <li className="type-box">
                      <TypeInfo type={type} />
                    </li>
                    <li>{`${getTime(startAt)} - ${getTime(endAt)}`}</li>
                    <li>{name}</li>
                    <li>-</li>
                  </ul>
                );
              }
            })}
          </div>
        </DashboardBottom>
      </DashboardWrap>
    </>
  );
};

const DashboardWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  align-items: center;
  font-size: ${theme.font.sub};
  gap: 1rem;
`;

const DashboardTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: 1px solid ${theme.colors.gray[700]};
  overflow: hidden;

  .selected-date {
    h3 {
      font-size: ${theme.font.subTitle};
      font-weight: bold;
      color: ${theme.colors.pri[600]};
      text-align: center;
      padding-block: 1rem;
    }
  }

  .total-info {
    display: flex;
    gap: 1rem;
    padding-block: 0.2rem;
    background-color: ${theme.colors.pri[900]};
    padding-inline: 1rem;
    justify-content: center;

    dl {
      display: flex;
      align-items: center;

      dt::after {
        content: ':';
        margin-inline: 2px;
      }

      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        margin-right: 5px;
        border-radius: 50%;
        background-color: ${theme.colors.Black};
      }
    }
  }
`;
const DashboardBottom = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 6px;
  border: 1px solid ${theme.colors.gray[700]};

  .type-info {
    padding-inline: 1rem;
    display: flex;
    gap: 0.8rem;
    background-color: ${theme.colors.gray[900]};
    border-bottom: 1px solid ${theme.colors.gray[700]};
    padding-block: 0.5rem;

    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .table {
    display: grid;
    width: 100%;
  }

  .table-row {
    display: grid;
    grid-template-columns: 0.8fr 3fr 4fr 2fr;
    align-items: center;
    padding-block: 0.5rem;
    text-align: left;
    cursor: pointer;
    padding-inline: 1rem;
    text-align: center;
    transition: all 0.4s;

    &.title {
      background-color: ${theme.colors.gray[900]};
      border-bottom: 1px solid ${theme.colors.gray[700]};
      color: ${theme.colors.pri[500]};
    }

    &:hover {
      opacity: 0.7;
      &.title {
        opacity: 1;
      }
    }

    .type-box {
      display: flex;
      justify-content: center;
    }
  }
`;

interface TypeInfoProps {
  type: string;
}

const TypeInfo = styled.p.attrs<TypeInfoProps>(() => ({}))`
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

interface TypeInfoTextProps {
  type: string;
}

const TypeInfoText = styled.span<TypeInfoTextProps>`
  color: ${({ type, theme }) => {
    switch (type) {
      case 'PRESENT':
        return theme.colors.pri[500];
      case 'ABSENT':
        return theme.colors.Error;
      case 'WAIT':
        return theme.colors.gray[500];
      case 'counseling':
        return '#4FB564';
      default:
        return 'transparent';
    }
  }};
`;

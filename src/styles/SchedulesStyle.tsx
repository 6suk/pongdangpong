import { styled } from 'styled-components';

import calendarIcon from '@assets/icons/schedules/calendar.svg';

import theme from './theme';

/** 홈 스타일(대시보트 + 캘린더) */
export const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: 7fr 3fr;
  width: 100%;
`;

export const SchedulesTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 1rem;
  align-items: center;
  align-items: flex-end;
`;

export const SchedulesContainer = styled.div`
  width: 100%;

  .hidden-date-input {
    opacity: 0;
    position: absolute;
    width: 0;
    height: 0;
  }

  .search-box {
    display: flex;
    align-items: flex-end;
    gap: 1rem;

    .date-box {
      height: 100%;
      width: 100%;
      min-width: 245px;
      label {
        width: 100%;
        font-size: ${theme.font.body};
        font-weight: 600;
        white-space: nowrap;
        margin-left: 0.4rem;
      }

      height: 43px;
      display: flex;
      align-items: center;
      padding-inline: 0.625rem;
      padding-block: 0.2rem;
      border: 1px solid ${theme.colors.inputBorder};
      border-radius: 6px;
    }
  }
`;

export const DateStyle = styled.input`
  width: 100px;

  &::-webkit-calendar-picker-indicator {
    color: rgba(0, 0, 0, 0);
    opacity: 1;
    display: block;
    background: url(${calendarIcon}) no-repeat center; // 대체할 아이콘
    width: 100%;
    cursor: pointer;
  }

  &::before {
    content: attr(data-placeholder);
    width: 100%;
  }
  &:focus {
    outline: none;
  }
`;

/** 대시보드 스타일 */
export const DashboardWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  align-items: center;
  font-size: ${theme.font.sub};
  gap: 1rem;
`;

export const DashboardTop = styled.div`
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
export const DashboardBottom = styled.div`
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

export interface TypeInfoProps {
  type: string;
}

export interface TypeInfoTextProps {
  type: string;
}
export const SchedulesTypeInfo = styled.p.attrs<TypeInfoProps>(() => ({}))`
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

export const SchedulesTypeInfoText = styled.span<TypeInfoTextProps>`
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

/** 캘린더 스타일 */

export const StyledCalendar = styled.div`
  font-size: ${theme.font.sub};
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  height: 100%;
  grid-gap: 1px;
  background-color: ${theme.colors.gray[800]};
  border: 1px solid ${theme.colors.gray[800]};
  border-radius: 6px;
  user-select: none;
`;

export const StyledDay = styled.div`
  background-color: white;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  align-items: flex-start;
  padding: 6px;
  position: relative;
  aspect-ratio: 6 / 5;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    background-color: ${theme.colors.gray[900]};
  }
`;

export const StyleDayNumber = styled.div<{ 'data-current-month': boolean; 'data-day-of-week'?: number }>`
  width: 25px;
  height: 25px;
  background-color: transparent;
  color: white;
  border-radius: 6px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  color: ${props =>
    props['data-current-month']
      ? props['data-day-of-week'] === 0
        ? props.theme.colors.Error
        : props['data-day-of-week'] === 6
        ? props.theme.colors.pri[500]
        : props.theme.colors.gray[100]
      : props.theme.colors.gray[500]};

  &.on {
    background-color: ${theme.colors.pri[600]};
    color: white;
  }
`;

export const StyleDayEvent = styled.p<{ 'data-current-month': boolean }>`
  width: 100%;
  text-align: left;
  padding-left: 0.5rem;
  color: ${theme.colors.pri[600]};
  padding-block: 0.2rem;
  border-radius: 6px;
  border: 1px solid;

  background-color: ${props =>
    props['data-current-month'] ? props.theme.colors.pri[900] : props.theme.colors.gray[800]};
  color: ${props => (props['data-current-month'] ? props.theme.colors.pri[600] : props.theme.colors.gray[500])};
  border-color: ${props => (props['data-current-month'] ? props.theme.colors.pri[800] : props.theme.colors.gray[700])};

  &.none {
    content: '';
    background-color: transparent;
    border: none;
  }
`;

export const StyledDayName = styled(StyledDay)`
  width: 100%;
  align-items: center; // Center vertically
  justify-content: center; // Center horizontally
  height: 40px;
  color: ${theme.colors.gray[500]};
  background-color: ${theme.colors.gray[900]};
`;

/** 디테일 페이지 스타일링 */

export const SchedulesDetailWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 1024px;

  .memo {
    font-size: 16px;
    margin-inline: 1rem;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid ${theme.colors.gray[800]};
    min-height: 100px;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    margin-inline: 1rem;
    justify-content: space-between;

    &.sub {
      margin-inline: 0.5rem;
      h3 {
        /* font-size: ${theme.font.body}; */
      }
    }

    .title {
      display: flex;
      align-items: center;
    }

    h3 {
      font-size: ${theme.font.subTitle};
      font-weight: 800;

      &.number {
        color: ${theme.colors.pri[500]};
        margin-left: 0.5rem;
      }
    }

    .createdAt {
      font-size: ${theme.font.sm};
      color: ${theme.colors.gray[500]};
      font-weight: 300;
      margin-left: 1rem;
      letter-spacing: 0.5px;
    }
    .btns {
      display: flex;
      gap: 1rem;
      button {
        font-size: 14px;
        transition: all 0.4s;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
`;

export const SchedulesInfoBar = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-inline: 1.5rem;
  border: 1px solid ${theme.colors.gray[800]};
  text-align: left;
  border-radius: 6px;
  font-size: 15px;
  justify-content: space-between;

  .btns {
    display: flex;
    gap: 0.5rem;
    button {
      width: 80px;
    }
  }

  .infos {
    display: flex;
    gap: 3rem;
    align-items: center;
    font-size: ${theme.font.subBody};

    dl {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    dt {
      font-weight: 600;
    }
  }

  &.title > p {
    font-weight: 600;
  }

  &.title {
    border: none;
    padding-block: 0;
  }

  .icon-box {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 600;

    svg {
      width: 30px;
    }
  }

  p {
    transition: all 0.4s;
  }

  .inactive {
    color: ${props => props.theme.colors.Error};
  }
`;

export const MemoPreview = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const MoreButton = styled.span`
  padding-inline: 0.3rem;
  padding-block: 0.1rem;
  border: 1px solid ${theme.colors.gray[700]};
  color: ${theme.colors.gray[500]};
  border-radius: 6px;
  cursor: pointer;
  margin-left: 7px;
  font-size: ${theme.font.sm};
`;

export const CounselingInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;

  textarea {
    padding-inline: 1.5rem;
    padding-block: 1.25rem;
  }
`;

export const CounselingCardItem = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

      button {
        font-size: ${theme.font.sub};
        border: 1px solid ${theme.colors.gray[700]};
        color: ${theme.colors.pri[600]};
        padding-block: 0.3rem;
        padding-inline: 0.6rem;
        border-radius: 8px;
        transition: all 0.4s;

        &:hover {
          font-weight: 600;
          background-color: ${theme.colors.gray[900]};
        }
      }
    }
  }
`;

export const PrivateLessonCardItem = styled.div`
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

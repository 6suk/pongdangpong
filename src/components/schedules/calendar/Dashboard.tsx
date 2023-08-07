import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useFilterAndSortSchedules } from '@hooks/utils/useFilterAndSortSchedules';

import { ScheduleType } from '@stores/selectedDateSlice';
import { RootState } from '@stores/store';
import {
  DashboardBottom,
  DashboardTop,
  DashboardWrap,
  SchedulesTypeInfo,
  SchedulesTypeInfoText,
} from '@styles/SchedulesStyle';

import { formatDate, formatTimeRange } from '@utils/schedules/formatTimestamp';

import { SchedulesProps } from './SchedulesHome';

export const Dashboard = ({ tutorId }: SchedulesProps) => {
  const selectedDate = useSelector((state: RootState) => state.calendar.checkDate);
  const navigate = useNavigate();
  const { sortedSchedules, totalSchedules, cancellationRate, canceledCount } = useFilterAndSortSchedules(
    selectedDate,
    tutorId
  );

  return (
    <>
      <DashboardWrap>
        <DashboardTop>
          <div className="selected-date">
            <h3>{formatDate(selectedDate)}</h3>
          </div>
          <div className="total-info">
            <dl>
              <dt>총 일정</dt>
              <dd>{totalSchedules}건</dd>
            </dl>
            <dl>
              <dt>취소 일정</dt>
              <dd>{canceledCount}건</dd>
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
              <SchedulesTypeInfo type="PRESENT" />
              <SchedulesTypeInfoText type="PRESENT">출석</SchedulesTypeInfoText>
            </li>
            <li>
              <SchedulesTypeInfo type="ABSENT" />
              <SchedulesTypeInfoText type="ABSENT">결석</SchedulesTypeInfoText>
            </li>
            <li>
              <SchedulesTypeInfo type="WAIT" />
              <SchedulesTypeInfoText type="WAIT">예약</SchedulesTypeInfoText>
            </li>
            <li>
              <SchedulesTypeInfo type="counseling" />
              <SchedulesTypeInfoText type="counseling">상담</SchedulesTypeInfoText>
            </li>
          </ul>
          <div className="table">
            <ul className="table-row title">
              <li className="type-box">출결</li>
              <li>진행시간</li>
              <li>회원명(총인원)</li>
              <li>잔여횟수</li>
            </ul>
            {sortedSchedules.map((v: ScheduleType) => {
              const { type, schedule } = v;
              // 개인 수업 일정
              if ('attendanceHistories' in schedule) {
                const {
                  startAt,
                  endAt,
                  attendanceHistories,
                  issuedTicket: { availableReservationCount },
                  id,
                } = schedule;
                return (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                  <ul key={id} className="table-row" onClick={() => navigate(`${type}/${id}`)}>
                    <li className="type-box">
                      <SchedulesTypeInfo type={schedule.attendanceHistories[0].status} />
                    </li>
                    <li>{formatTimeRange(startAt, endAt)}</li>
                    <li>{`${attendanceHistories[0].member.name} (${attendanceHistories.length})`}</li>
                    <li>{availableReservationCount ? `${availableReservationCount}회` : '무제한'}</li>
                  </ul>
                );
              }
              // 상담 일정
              else {
                const {
                  id,
                  startAt,
                  endAt,
                  client: { name },
                } = schedule;
                return (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                  <ul key={id} className="table-row" onClick={() => navigate(`${type}/${id}`)}>
                    <li className="type-box">
                      <SchedulesTypeInfo type={type} />
                    </li>
                    <li>{formatTimeRange(startAt, endAt)}</li>
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

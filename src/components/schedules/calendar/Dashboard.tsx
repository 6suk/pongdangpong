import { useCallback, useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Schedules_list } from '@apis/schedulesAPIs';
import { ScheduleType } from '@stores/selectedDateSlice';
import { RootState } from '@stores/store';
import {
  DashboardBottom,
  DashboardTop,
  DashboardWrap,
  SchedulesTypeInfo,
  SchedulesTypeInfoText,
} from '@styles/SchedulesStyle';

import { filterAndSortSchedulesByDate, filterAndSortSchedulesByDateType } from '@utils/filterAndSortSchedulesByDate';
import { formatTimeRange } from '@utils/formatTimestamp';

import { getDateDetails } from '@utils/getDate';

import { DAYOFWEEK_ENUM } from './Calendar';
import { SchedulesPropsType } from './SchedulesHome';

interface DashboardProps {
  propsData: SchedulesPropsType;
}

export const Dashboard = ({ propsData }: DashboardProps) => {
  const selectedDate = useSelector((state: RootState) => state.calendar.checkDate);
  const navigate = useNavigate();
  const selectedDay = getDateDetails(selectedDate);
  const { year, month, date, dayOfWeek } = selectedDay;
  const formattedDate = `${year}.${month.toString().padStart(2, '0')}.${date.toString().padStart(2, '0')}(${
    DAYOFWEEK_ENUM[dayOfWeek]
  })`;
  const [sortSchedules, setSortSchedules] = useState<ScheduleType[]>([]);

  // 필터 및 정렬, 취소 카운트
  const filterDataResult = useMemo(
    () => filterAndSortSchedulesByDate(selectedDate, propsData),
    [selectedDate, propsData]
  );

  // 일정 상세 데이터
  useEffect(() => {
    setSortSchedules(filterDataResult.sortedSchedules);
  }, [filterDataResult]);

  // 총 일정, 취소 일정, 취소율
  const canceledSchedules = filterDataResult.canceledCount;
  const totalSchedules = sortSchedules.length + canceledSchedules;
  const cancellationRate = totalSchedules > 0 ? Math.floor((canceledSchedules / totalSchedules) * 100) : 0;

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
              } else {
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

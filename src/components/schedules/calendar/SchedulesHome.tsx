import { useEffect, useState, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { Schedules_list_counseling, Schedules_list_private, SearchResponseType } from '@apis/schedulesAPIs';

import { Button } from '@components/common/Button';

import { SelectField } from '@components/common/SelectField';
import { useSwrData } from '@hooks/apis/useSwrData';
import useInput from '@hooks/utils/useInput';
import { setSelectedDate } from '@stores/selectedDateSlice';
import { AppDispatch, RootState } from '@stores/store';

import { CalendarContainer, DateStyle, SchedulesContainer, SchedulesTop } from '@styles/SchedulesStyle';

import { mapActiveStaffToLabelValue } from '@utils/mapActiveStaffToOption';
import { formatDate } from '@utils/schedules/formatTimestamp';
import { getLastDateOfMonth } from '@utils/schedules/getDate';

import { Calendar } from './Calendar';
import { Dashboard } from './Dashboard';
import { SchedulesFormModal } from '../form/SchedulesFormModal';

const initInput = {
  tutor: '',
  calendarUnit: 'month',
};

export interface SchedulesPropsType {
  counselingSchedules: Schedules_list_counseling[];
  privateSchedules: Schedules_list_private[];
}

export interface SchedulesProps {
  tutorId: number;
}

export const SchedulesHome = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValues, onChange] = useInput(initInput);
  const [isOpen, setIsOpen] = useState(false);
  const selectedDate = useSelector((state: RootState) => state.calendar.checkDate);
  const lastNextDates = useSelector((state: RootState) => state.calendar.lastNextDates);
  const { data } = useSwrData<SearchResponseType>(`search?resource=USER`);
  const staffOption = useMemo(() => {
    return mapActiveStaffToLabelValue(data?.users);
  }, [data]);

  // 초기 진입 시 셀렉트될 날짜
  useEffect(() => {
    const { formattedFirstDate, formattedLastDate } = getLastDateOfMonth(selectedDate);
    const { last, next } = lastNextDates;
    setSearchParams({
      from: last !== '' ? last : formattedFirstDate,
      to: next !== '' ? next : formattedLastDate,
    });
  }, [selectedDate, setSearchParams, lastNextDates]);

  /** 달력 검색 날짜 저장 */
  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedDate(e.target.value));
  };

  return (
    <>
      <SchedulesContainer>
        <SchedulesTop>
          <div>
            <div className="search-box">
              <div className="date-box">
                <label>{formatDate(selectedDate)}</label>
                <DateStyle type="date" onChange={handleChangeDate} />
              </div>
              <SelectField
                name="tutor"
                options={[{ label: '전체', value: 0 }, ...staffOption]}
                value={inputValues.tutor}
                onChange={onChange}
              />
              <SelectField
                name="calendarUnit"
                value={inputValues.calendarUnit}
                options={[
                  { label: '월', value: 'month' },
                  { label: '주', value: 'week' },
                  { label: '일', value: 'day' },
                ]}
                onChange={onChange}
              />
            </div>
          </div>
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            + 일정 추가
          </Button>
        </SchedulesTop>
        {/* 캘린더 & 대시보드 */}
        <CalendarContainer>
          <Calendar tutorId={parseInt(inputValues.tutor)} />
          <Dashboard tutorId={parseInt(inputValues.tutor)} />
        </CalendarContainer>
        {/* 캘린더 & 대시보드 */}
      </SchedulesContainer>
      {isOpen && <SchedulesFormModal setIsOpen={setIsOpen} />}
    </>
  );
};

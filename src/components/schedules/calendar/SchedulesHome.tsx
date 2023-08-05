import { useEffect, useState, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';

import { Schedules_list, Schedules_list_counseling, Schedules_list_private } from '@apis/schedulesAPIs';

import { SelectField } from '@components/center/ticket/form/SelectField';
import { Button } from '@components/common/Button';

import { useSwrData } from '@hooks/apis/useSwrData';

import useInput from '@hooks/utils/useInput';
import { setSelectedDate } from '@stores/selectedDateSlice';
import { AppDispatch, RootState } from '@stores/store';

import { CalendarContainer, DateStyle, SchedulesContainer, SchedulesTop } from '@styles/SchedulesStyle';

import { formatDate } from '@utils/formatTimestamp';
import { getLastDateOfMonth } from '@utils/getDate';

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

export const SchedulesHome = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValues, onChange] = useInput(initInput);
  const { data } = useSwrData<Schedules_list>(location.search ? location.pathname + location.search : '');
  const {
    checkDate: selectedDate,
    lastNextDates: { last, next },
  } = useSelector((state: RootState) => state.calendar);
  const [isOpen, setIsOpen] = useState(false);
  const propsData = useMemo<SchedulesPropsType | undefined>(() => {
    if (data?.counselingSchedules && data?.privateSchedules) {
      const { counselingSchedules, privateSchedules } = data;
      return { counselingSchedules, privateSchedules };
    }
  }, [data]);

  // 초기 진입 시 셀렉트될 날짜
  useEffect(() => {
    const { formattedFirstDate, formattedLastDate } = getLastDateOfMonth(selectedDate);
    setSearchParams({
      from: last !== '' ? last : formattedFirstDate,
      to: next !== '' ? next : formattedLastDate,
    });
  }, [last, next, setSearchParams]);

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
                placeholder="강사 선택"
                value={inputValues.tutor}
                options={[
                  { label: '강사이름1', value: 0 },
                  { label: '강사이름2', value: 1 },
                  { label: '강사이름3', value: 2 },
                ]}
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
        <CalendarContainer>
          {/* 데이터를 받아온 후 렌더링 */}
          {propsData && (
            <>
              <Calendar propsData={propsData} />
              <Dashboard propsData={propsData} />
            </>
          )}
        </CalendarContainer>
      </SchedulesContainer>
      {isOpen && <SchedulesFormModal setIsOpen={setIsOpen} />}
    </>
  );
};

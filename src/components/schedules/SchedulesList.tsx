import { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { styled } from 'styled-components';

import calendarIcon from '@assets/icons/schedules/calendar.svg';

import { Button } from '@components/common/Button';
import { Modal } from '@components/common/Modal';
import { getLastDateOfMonth } from '@components/schedules/utils/getDate';

import { useSwrData } from '@hooks/apis/useSwrData';

import { setEventCount, setSelectedDate, setSortSchedules } from '@stores/selectedDateSlice';
import { AppDispatch, RootState } from '@stores/store';

import { SC } from '@styles/styles';
import theme from '@styles/theme';

import { Calendar } from './Calendar';
import { SchedulesModal } from './SchedulesModal';
import { filterAndSortSchedulesByDate } from './utils/filterAndSortSchedulesByDate';
import { getEventCountbyDate } from './utils/getEventCountbyDate';

export const SchedulesList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { data, isError } = useSwrData(location.search ? location.pathname + location.search : '');
  const eventCount = useCallback(getEventCountbyDate, [data?.counselingSchedules]);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    checkDate: selectedDate,
    lastNextDates: { last, next },
  } = useSelector((state: RootState) => state.calendar);
  const [isOpen, setIsOpen] = useState(false);

  // 일정 데이터 (카운트)
  useEffect(() => {
    if (data?.counselingSchedules && data?.privateSchedules) {
      const newCounts = eventCount([...data.counselingSchedules, ...data.privateSchedules]);
      dispatch(setEventCount(Object.values(newCounts)));
    }
  }, [data, dispatch]);

  const filterData = useCallback(() => {
    return filterAndSortSchedulesByDate(data.counselingSchedules, data.privateSchedules, selectedDate);
  }, [selectedDate, data]);

  // 일정 상세 데이터
  useEffect(() => {
    if (data?.counselingSchedules && data?.privateSchedules) {
      const combinedAndSortedSchedules = filterData();
      dispatch(setSortSchedules(combinedAndSortedSchedules));
    }
  }, [selectedDate]);

  // 달력 검색
  useEffect(() => {
    const { formattedFirstDate, formattedLastDate } = getLastDateOfMonth(selectedDate);
    setSearchParams({
      from: last !== '' ? last : formattedFirstDate,
      to: next !== '' ? next : formattedLastDate,
    });
  }, [last, next, setSearchParams]);

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedDate(e.target.value));
  };

  return (
    <>
      <SchedulesContainer>
        <Top>
          <div>
            <div className="search-box">
              <div className="date-box">
                <label>{`${new Date(selectedDate).getFullYear()}년 ${new Date(selectedDate).getMonth() + 1}월`}</label>
                <DateStyle type="date" onChange={handleChangeDate} />
              </div>
              <SC.Select__ id="" name="" value={'강사이름1'}>
                <option value="강사이름1">강사이름1</option>
                <option value="강사이름2">강사이름2</option>
              </SC.Select__>
              <SC.Select__ id="" name="" value={'강사이름1'}>
                <option value="강사이름1">강사이름1</option>
                <option value="강사이름2">강사이름2</option>
              </SC.Select__>
            </div>
          </div>
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            + 일정 추가
          </Button>
        </Top>
        <Calendar />
      </SchedulesContainer>
      {isOpen && <SchedulesModal setIsOpen={setIsOpen} />}
    </>
  );
};

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 1rem;
  align-items: center;
  align-items: flex-end;
`;

const SchedulesContainer = styled.div`
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

const DateStyle = styled.input`
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

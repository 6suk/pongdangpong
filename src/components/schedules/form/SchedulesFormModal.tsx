import { Dispatch, SetStateAction } from 'react';

import { useNavigate } from 'react-router-dom';

import { DumbbellIcon, UserColorIcon } from '@assets/icons/indexIcons';
import { Modal } from '@components/common/Modal';
import { SchedulesModalWrap } from '@styles/modal/modalStyle';

export const SchedulesFormModal = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const navigate = useNavigate();

  return (
    <>
      <Modal maxWidth="48rem" setIsOpen={setIsOpen}>
        <SchedulesModalWrap>
          <div className="title">
            <h3>일정생성</h3>
            <p>일정을 생성해 주세요.</p>
          </div>

          <div className="btns">
            <button
              className="schedules-btn"
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate('private-lesson/new');
              }}
            >
              <h4>개인 수업</h4>
              <h6>일정 생성</h6>
              <p className="icon-box">
                <DumbbellIcon />
              </p>
            </button>
            <button className="schedules-btn none" type="button">
              <h4>그룹 수업</h4>
              <h6>준비중인 기능입니다.</h6>
              <p className="icon-box">
                <DumbbellIcon />
              </p>
            </button>
            <button
              className="schedules-btn"
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate('counseling/new');
              }}
            >
              <h4>상담</h4>
              <h6>일정 생성</h6>
              <p className="icon-box">
                <UserColorIcon />
              </p>
            </button>
          </div>
        </SchedulesModalWrap>
      </Modal>
    </>
  );
};

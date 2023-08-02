import { Dispatch, SetStateAction } from 'react';

import { useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

import { DumbbellIcon, UserColorIcon } from '@assets/icons/indexIcons';
import { Modal } from '@components/common/Modal';
import theme from '@styles/theme';

export const SchedulesModal = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
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

const SchedulesModalWrap = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    display: flex;
    text-align: left;
    flex-direction: column;

    h3 {
      margin-bottom: 0;
    }
  }

  .btns {
    display: flex;
    gap: 1rem;

    .schedules-btn {
      display: flex;
      flex-direction: column;
      padding: 1.25rem;
      border-radius: 6px;
      border: 1px solid ${theme.colors.inputBorder};
      width: 100%;
      position: relative;
      height: 180px;
      transition: all 0.4s;

      h4 {
        font-weight: 800;
        font-size: ${theme.font.body};
      }

      h6 {
        font-size: ${theme.font.sub};
        color: ${theme.colors.gray[400]};
      }

      &:hover:not(.none) {
        border: 1px solid ${theme.colors.pri[700]};
      }
    }

    .none {
      .icon-box {
        border: 1px solid ${theme.colors.gray[700]};
        background-color: transparent;

        svg {
          fill: ${theme.colors.gray[600]};
        }
      }
    }

    .icon-box {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 0.5rem;
      border-radius: 50%;
      background-color: ${theme.colors.pri[900]};
      aspect-ratio: 1/1;
      display: flex;
      margin: 1.25rem;
      align-items: center;

      svg {
        height: 22px;
        width: auto;
        fill: ${theme.colors.pri[800]};
      }
    }
  }
`;

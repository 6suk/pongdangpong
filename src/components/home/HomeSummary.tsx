import { useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

import { MeSummaryType } from '@apis/authAPIs';
import { UserColorIcon, BackIcon, MemberIcon } from '@assets/icons/indexIcons';
import { useSwrData } from '@hooks/apis/useSwrData';
import theme from '@styles/theme';

export const HomeSummary = () => {
  const { data, isLoading } = useSwrData(`me/summary`);
  const { center, mySchedule, message } = (data as MeSummaryType) ?? {};
  const { staffCount, myMemberCount } = center ?? {};
  const { lessonCount, counselingCount } = mySchedule ?? {};
  const navigate = useNavigate();

  return (
    !isLoading && (
      <>
        <SchedulesModalWrap>
          <div className="btn-wrapper">
            <div className="btn-container">
              <span className="top-left-text">나의 오늘 일정</span>
              <button
                className="home-btn"
                type="button"
                onClick={() => {
                  navigate('/schedules');
                }}
              >
                <h4>총 {lessonCount + counselingCount}건의 일정</h4>
                <h6>
                  수업 {lessonCount}건, 상담 {counselingCount}건
                </h6>
                <span className="count">{lessonCount + counselingCount}</span>
                <p className="icon-box">
                  <UserColorIcon />
                </p>
              </button>
            </div>
            <div className="btn-container">
              <div className="top-left-text">나의 회원</div>
              <button
                className="home-btn"
                type="button"
                onClick={() => {
                  navigate('/members');
                }}
              >
                <h4>나의 회원 수</h4>
                <span className="count">{myMemberCount}</span>
                <p className="icon-box">
                  <UserColorIcon />
                </p>
              </button>
            </div>

            <div className="btn-container">
              <span className="top-left-text">전체 직원</span>

              <button
                className="home-btn"
                type="button"
                onClick={() => {
                  navigate('/center/staffs');
                }}
              >
                <h4>전체 직원 수</h4>
                <span className="count">{staffCount}</span>
                <p className="icon-box">
                  <UserColorIcon />
                </p>
              </button>
            </div>
          </div>
        </SchedulesModalWrap>
      </>
    )
  );
};

const SchedulesModalWrap = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;

  .btn-wrapper {
    display: flex;
    gap: 1rem;
    width: 100%;
    margin-inline: 1rem;

    .btn-container {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;

      .top-left-text {
        position: relative;
        margin-bottom: 1rem;
        left: 0.5rem;
        bottom: -0.5rem;
        color: ${theme.colors.gray[200]};
        font-size: ${theme.font.sub};
      }

      .home-btn {
        display: flex;
        flex-direction: column;

        padding: 1.25rem;
        border-radius: 6px;
        border: 1px solid ${theme.colors.inputBorder};
        position: relative;
        height: 220px;
        transition: all 0.4s;

        h4 {
          font-weight: 600;
          font-size: ${theme.font.body};
          color: ${theme.colors.gray[50]};
          margin-bottom: 0.5rem;
        }

        h6 {
          font-size: ${theme.font.body};
          color: ${theme.colors.gray[50]};
        }

        .count {
          position: absolute;
          bottom: -1rem;
          right: 0;
          padding: 1.25rem;
          color: ${theme.colors.pri[500]};
          font-size: 2.25rem;
          font-weight: 800;
        }

        &:hover {
          border: 1px solid ${theme.colors.pri[700]};
        }
      }

      .icon-box {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.5rem;
        border-radius: 50%;
        background-color: ${theme.colors.gray[800]};
        aspect-ratio: 1/1;
        display: flex;
        margin: 1.25rem;
        align-items: center;
        width: 40px; /* 동그라미의 너비 지정 */
        height: 40px; /* 동그라미의 높이 지정 */
        justify-content: center;
        svg {
          height: 22px;
          width: auto;

          fill: ${theme.colors.gray[700]};
        }
      }
    }
  }
`;

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { styled } from 'styled-components';

import { BackIcon, MemberIcon } from '@assets/icons/indexIcons';
import { BackButton, DetailButton } from '@components/center/ticket/TicketIssued';
import { TypeInfoProps } from '@components/schedules/calendar/Dashboard';
import { useSwrData } from '@hooks/apis/useSwrData';

import { TicketWrap } from '@styles/center/ticketsStyle';
import theme from '@styles/theme';

export const PrivateLessonDetail = () => {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const { pathname } = useLocation();
  const { data, isLoading } = useSwrData(pathname);
  console.log(data);

  return (
    !isLoading && (
      <>
        <SchedulesDetailWrap>
          <div>
            <div className="header">
              <div className="title">
                <h3>수업 정보</h3>
                <p className="createdAt">생성일 2023년 7월 20일 (목) 00시 36분 고예림</p>
              </div>
              <BackButton onClick={() => navigate(-1)}>
                <BackIcon />
                <p>뒤로가기</p>
              </BackButton>
            </div>
            <SchedulesInfoBar>
              <div className="infos">
                <dl>
                  <dt>일정</dt>
                  <dd>2023.07.21 (금)</dd>
                </dl>
                <dl>
                  <dt>시간</dt>
                  <dd>09:00 ~ 10:00</dd>
                </dl>
                <dl>
                  <dt>정원</dt>
                  <dd>1명</dd>
                </dl>
                <dl>
                  <dt>강사</dt>
                  <dd>고예림</dd>
                </dl>
              </div>
              <div className="btns">
                <DetailButton className="pri" onClick={() => {}}>
                  변경
                </DetailButton>
                <DetailButton onClick={() => {}}>취소</DetailButton>
              </div>
            </SchedulesInfoBar>
          </div>
          <div>
            <div className="header">
              <div className="title">
                <h3>참여회원(1)</h3>
              </div>
            </div>
            <TicketWrap>
              <CardItem>
                <div className="card-top">
                  <div className="top-left">
                    <MemberIcon />
                    <div className="name-box">
                      <p className="name">정현철</p>
                      <p>010 - 6645 - 9116</p>
                    </div>
                  </div>
                  <div className="top-btns">
                    <button className="border-btn" type="button">
                      출석
                    </button>
                    <button className="border-btn" type="button">
                      결석
                    </button>
                  </div>
                </div>
                <div className="card-bottom">
                  <div className="infos">
                    <dl>
                      <dt>출결상태</dt>
                      <dd className="type-box">
                        <TypeInfo type={'WAIT'} />
                        <p>예약</p>
                      </dd>
                    </dl>
                    <dl>
                      <dt>수강권명</dt>
                      <dd>통증관리</dd>
                    </dl>
                    <dl>
                      <dt>잔여</dt>
                      <dd>3회 (총3회)</dd>
                    </dl>
                    <dl>
                      <dt>예약 가능</dt>
                      <dd>3회 (총3회)</dd>
                    </dl>
                  </div>
                </div>
              </CardItem>
            </TicketWrap>
          </div>
        </SchedulesDetailWrap>
      </>
    )
  );
};

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

const CardItem = styled.div`
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

      .border-btn {
        color: ${theme.colors.gray[200]};
        padding-inline: 1.25rem;
        padding-block: 0.5rem;
        font-size: ${theme.font.sub};
        border-radius: 0.375rem;
        transition: all 0.4s;
        outline: none;
        border: 1px solid ${theme.colors.gray[700]};
        border-radius: 6px;

        &:hover {
          font-weight: 600;
          background-color: ${theme.colors.gray[900]};
        }
      }
    }
  }
  .card-bottom {
    padding-inline: 1.5rem;
    padding-block: 2rem;
    flex: 7;

    .type-box {
      display: flex;
      gap: 0.2rem;
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

      dt {
        font-weight: 600;
      }
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

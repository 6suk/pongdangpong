import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { styled } from 'styled-components';

import { MemberIcon, UserIcon } from '@assets/icons/indexIcons';
import { useSwrData } from '@hooks/apis/useSwrData';

import theme from '@styles/theme';

import { StaffsEditModal } from './StaffsEditModal';
import { DetailButton } from '../ticket/TicketIssued';

export const StaffsDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useSwrData(`staffs/${id}`);
  const { name, roles, phone, loginId, active, createdAt, members, prescriptionReviews, updatedAt, memo } = data ?? {};
  const [isOpen, setIsOpen] = useState(false);

  return (
    !isLoading && (
      <>
        <StaffDetailWrap>
          <div>
            <div className="header">
              <div className="title">
                <h3>직원 정보</h3>
                <p className="createdAt">{createdAt.split('T')[0].replace(/-/g, '.')} 등록</p>
              </div>
              <div className="btns">
                <button type="button">역할 설정</button>
                <button type="button">비밀번호 초기화</button>
                <button type="button">직원 퇴사 처리</button>
              </div>
            </div>
            <StaffInfoBar>
              <div className="infos">
                <div className="name-and-role">
                  <p className="icon-box">
                    <MemberIcon /> {name}
                  </p>
                  <p className="role-box">
                    {roles.map((v: { id: number; name: string }) => {
                      return (
                        <span key={v.id} className="tag">
                          {v.name}
                        </span>
                      );
                    })}
                  </p>
                </div>
                <p>{phone}</p>
                <p>{loginId}</p>
                <p>{active && '재직중'}</p>
              </div>
              <DetailButton
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                편집
              </DetailButton>
            </StaffInfoBar>
          </div>
          <div>
            <div className="header">
              <div className="title">
                <h3>개인 수업 회원</h3>
                <h3 className="number">{members.length}</h3>
              </div>
            </div>
            <ListWrap>
              <div className="table">
                <div className="table-row title">
                  <p>회원명</p>
                  <p>성별</p>
                  <p></p>
                  <p>최근 방문일</p>
                </div>
                {members.length > 0 ? (
                  members.map((v: { id: number; name: string; phone: string; sex: string; visitedAt: string }) => {
                    return (
                      <div key={v.id} className="table-row">
                        <p className="icon-box">
                          <MemberIcon /> {v.name}
                        </p>
                        <p>{v.sex === 'MALE' ? '남' : '여'}</p>
                        <p></p>
                        <p>{v.visitedAt.split('T')[0]}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="empty">
                    <UserIcon />
                    <p>배정된 회원이 없습니다.</p>
                  </div>
                )}
              </div>
            </ListWrap>
          </div>
          {/* <div>
            <div className="header">
              <div className="title">
                <h3>만족도 및 후기</h3>
                <h3 className="number">{prescriptionReviews.length}</h3>
                <p className="createdAt">(최근 일주일간의 후기만 하단에 노출됩니다.)</p>
              </div>
            </div>
            <ListWrap>
              <div className="table">
                <div className="table-row-two title">
                  <p>회원명</p>
                  <p>연락처</p>
                  <p>만족도</p>
                  <p></p>
                  <p>최근 작성일</p>
                </div>
                {prescriptionReviews.map(
                  (v: { id: number; name: string; phone: string; sex: string; visitedAt: string }) => {
                    return (
                      <div key={v.id} className="table-row">
                        <p className="icon-box">
                          <MemberIcon /> {v.name}
                        </p>
                        <p>{v.sex === 'MALE' ? '남' : '여'}</p>
                        <p></p>
                        <p>{v.visitedAt.split('T')[0]}</p>
                      </div>
                    );
                  }
                )}
              </div>
            </ListWrap>
          </div> */}

          <div>
            <div className="header">
              <div className="title">
                <h3>메모</h3>
                <p className="createdAt">{updatedAt.split('T')[0].replace(/-/g, '.')} 업데이트</p>
              </div>
            </div>
            <div className="memo">{memo}</div>
          </div>
        </StaffDetailWrap>
        {isOpen && id && <StaffsEditModal id={id} setIsOpen={setIsOpen} />}
      </>
    )
  );
};

const ListWrap = styled.div`
  font-size: 16px;
  margin-inline: 1rem;

  .empty {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    color: ${theme.colors.gray[500]};

    svg {
      width: 60px;
    }
  }

  .table {
    display: grid;
    width: 100%;
    gap: 1rem;
  }

  .table-row {
    display: grid;
    grid-template-columns: 2fr 2fr 7fr 1fr;
    align-items: center;
    padding: 1rem;
    border: 1px solid ${theme.colors.gray[800]};
    text-align: left;
    cursor: pointer;
    border-radius: 6px;
    font-size: 14px;

    &.title {
      border: none;
      padding-block: 0;
      color: ${theme.colors.gray[500]};
    }

    .icon-box {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-weight: 600;

      svg {
        width: 26px;
        height: auto;
      }
    }

    p {
      transition: all 0.4s;
    }
  }
`;

const StaffDetailWrap = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

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

const StaffInfoBar = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${theme.colors.gray[800]};
  text-align: left;
  border-radius: 6px;
  font-size: 15px;
  justify-content: space-between;

  button {
    width: 80px;
  }

  .infos {
    display: flex;
    gap: 3rem;
    align-items: center;
  }

  .name-and-role {
    display: flex;
    gap: 1rem;

    .role-box {
      display: flex;
      gap: 0.2rem;
      align-items: center;

      .tag {
        font-size: ${theme.font.sm};
        padding-inline: 0.5rem;
        padding-block: 0.2rem;
        background-color: ${theme.colors.pri[900]};
        color: ${theme.colors.pri[500]};
        border-radius: 6px;
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
`;

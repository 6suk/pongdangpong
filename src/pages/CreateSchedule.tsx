import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { Button } from '@components/common/Button';
import { Modal } from '@components/common/Modal';

import { useRequests } from '@hooks/apis/useRequests';
import { useSwrData } from '@hooks/apis/useSwrData';

import { SC } from '@styles/styles';
import theme from '@styles/theme';

type FormInputs = {
  userId: number;
  issuedTicketId: number;
  memberId: number;
  memo: string;
  date: string;
  startTime: string;
  endTime: string;
  startAt: string;
  endAt: string;
};

const initialInputs: FormInputs = {
  userId: 0,
  issuedTicketId: 0,
  memberId: 0,
  memo: '',
  date: '',
  startTime: '',
  endTime: '',
  startAt: '',
  endAt: '',
};

interface UserData {
  id: number;
  type: string;
  loginId: string;
  name: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginedAt: string;
}

interface MemberData {
  id: number;
  name: string;
  phone: string;
  sex: 'MALE' | 'FEMALE';
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  visitedAt: string;
}

type AvailableTicket = {
  id: number;
  title: string;
  lessonType: string;
  privateTutorId: number;
  remainingCount: number;
  availableReservationCount: number;
  lessonDuration: number;
  owners: Array<{
    id: number;
    name: string;
    phone: string;
  }>;
};

export const CreateSchedule = () => {
  const [formInputs, setFormInputs] = useState<FormInputs>(initialInputs);

  const { data: userData, isLoading: userLoading, isError: userError } = useSwrData('search?resource=USER');
  const { data: memberData, isLoading: memberLoading, isError: memberError } = useSwrData('search?resource=MEMBER');

  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const {
    data: ticketsData,
    isLoading: ticketsLoading,
    isError: ticketsError,
  } = useSwrData(`members/${selectedMemberId}/bookable-tickets`);

  const navigate = useNavigate();
  const { request } = useRequests();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [selectedMemberName, setSelectedMemberName] = useState<string | null>(null);
  const [modalType, setModalType] = useState<'USER' | 'MEMBER' | null>(null);
  const [availableTickets, setAvailableTickets] = useState<AvailableTicket[] | null>(null);
  const [selectedOwnerId, setSelectedOwnerId] = useState<number | null>(null);
  const [selectedOwnerName, setSelectedOwnerName] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<AvailableTicket | null>(null);

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    switch (target.name) {
      case 'clientPhone':
        target.value = target.value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        break;
    }
    setFormInputs({ ...formInputs, [target.name]: target.value });
  };

  const handleSearchClick = (type: 'USER' | 'MEMBER') => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (type === 'MEMBER' && !selectedUserName) {
      alert('담당 강사를 먼저 선택해주세요.');
      return;
    }
    setModalType(type);
    setIsOpen(true);
  };

  const handleUserSelect = (userId: number, userName: string) => {
    setFormInputs({ ...formInputs, userId });
    setSelectedUserName(userName);
    setIsOpen(false);
  };

  const handleMemberSelect = (memberId: number, memberName: string) => {
    setFormInputs({ ...formInputs, memberId });
    setSelectedMemberName(memberName);
    setSelectedMemberId(memberId);
    setIsOpen(false);
  };

  const handleOwnerSelect = (id: number, name: string) => {
    // 여기에 원하는 동작 구현
    setSelectedOwnerId(id);
    setSelectedOwnerName(name);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const date = formInputs['date'].replace(/\./g, '-');
    const startTime = formInputs['startTime'];
    const endTime = formInputs['endTime'];

    const startAt = new Date(`${date}T${startTime}:00`).toISOString();
    const endAt = new Date(`${date}T${endTime}:00`).toISOString();

    const payload = {
      userId: formInputs.userId,
      issuedTicketId: formInputs.issuedTicketId,
      startAt,
      endAt,
    };

    try {
      await request({
        url: 'schedules/private-lesson',
        method: 'post',
        body: payload,
      });
      console.log('등록 완료');
      navigate('/schedule');
      setFormInputs(initialInputs);
    } catch (error) {
      console.error(error);
    }
  };

  const isValid = () => {
    const { userId, memberId, issuedTicketId, date, startTime, endTime } = formInputs;
    return userId && memberId && issuedTicketId && date && startTime && endTime;
  };

  useEffect(() => {
    console.log(formInputs);
  }, [formInputs]);

  useEffect(() => {
    if (ticketsData) {
      setAvailableTickets(ticketsData.availableTickets);
    }
  }, [ticketsData]);
  useEffect(() => {
    if (!selectedMemberName) {
      clearMemberSelection();
    }
  }, [selectedMemberName]);
  const clearSelection = () => {
    setSelectedUserName(null);
    setSelectedMemberName(null);
    setSelectedTicket(null);
  };

  const clearMemberSelection = () => {
    setSelectedMemberName(null);
    setSelectedTicket(null);
    // 참여회원 등 다른 관련 상태값도 초기화
  };

  return (
    <>
      <S.Container theme={theme}>
        <h2>일정 생성</h2>
        <p>개인 수업 일정을 생성합니다.</p>
        <S.wrap theme={theme}>
          <div className="first-column">
            <SC.Label>
              담당 강사 선택 <span>*</span>
            </SC.Label>
            <SelectButton onClick={handleSearchClick('USER')} disabled={!!selectedUserName}>
              선택하기 +
            </SelectButton>
            {selectedUserName && (
              <NameButton onClick={() => setSelectedUserName('')}>
                <span className="user-name">{selectedUserName}</span>
                <span
                  className="close-button"
                  onClick={e => {
                    clearSelection();
                    e.stopPropagation();
                  }}
                  onKeyDown={e => e.key === 'Enter' && clearSelection()}
                  tabIndex={0}
                  role="button"
                >
                  x
                </span>
              </NameButton>
            )}

            <SC.Label>
              회원 선택 <span>*</span>
            </SC.Label>
            <SelectButton onClick={handleSearchClick('MEMBER')} disabled={!!selectedMemberName}>
              선택하기 +
            </SelectButton>
            {selectedMemberName && (
              <NameButton onClick={() => setSelectedMemberName('')}>
                <span className="user-name">{selectedMemberName}</span>
                <span
                  className="close-button"
                  onClick={() => clearMemberSelection()}
                  onKeyDown={e => e.key === 'Enter' && setSelectedMemberName(null)}
                  tabIndex={0}
                  role="button"
                >
                  x
                </span>
              </NameButton>
            )}

            {isOpen && (
              <Modal setIsOpen={setIsOpen}>
                {modalType === 'USER' ? (
                  userLoading ? (
                    <div>데이터를 불러오는 중...</div>
                  ) : userError ? (
                    <div>오류가 발생했습니다.</div>
                  ) : (
                    <ul>
                      {userData?.users.map((user: UserData, index: number) => (
                        <li key={index}>
                          <button type="button" onClick={() => handleUserSelect(user.id, user.name)}>
                            아이디: {user.id}, 타입: {user.type}, 이름: {user.name}, 로그인 ID: {user.loginId},
                            전화번호: {user.phone}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )
                ) : memberLoading ? (
                  <div>데이터를 불러오는 중...</div>
                ) : memberError ? (
                  <div>오류가 발생했습니다.</div>
                ) : (
                  <ul>
                    {memberData?.members.map((member: MemberData, index: number) => (
                      <li key={index}>
                        <button type="button" onClick={() => handleMemberSelect(member.id, member.name)}>
                          이름: {member.name}, 전화번호: {member.phone}, 성별: {member.sex}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </Modal>
            )}

            <SC.Label>
              수강권 선택 <span>*</span>
            </SC.Label>
            <SC.Select
              name="lessonTicket"
              disabled={!selectedMemberName}
              value={selectedTicket ? selectedTicket.id : ''}
              onChange={e => {
                const selectedTicketId = Number(e.target.value);
                const foundTicket = availableTickets?.find(ticket => ticket.id === selectedTicketId);
                setSelectedTicket(foundTicket || null);
                setFormInputs({ ...formInputs, issuedTicketId: selectedTicketId });
              }}
            >
              <option className="option-title" defaultValue="">
                수강권을 선택해주세요.
              </option>
              {ticketsLoading ? (
                <option>데이터 불러오는 중...</option>
              ) : ticketsError ? (
                <option>데이터를 불러올 수 없습니다.</option>
              ) : (
                availableTickets
                  ?.filter(ticket => ticket.privateTutorId === formInputs.userId)
                  .map(ticket => (
                    <option value={ticket.id} key={ticket.id}>
                      {ticket.title} ({ticket.lessonDuration}분)
                    </option>
                  ))
              )}
            </SC.Select>

            <SC.Label>참여회원</SC.Label>
            {selectedTicket ? (
              selectedTicket.owners.map((owner, ownerIndex) => (
                <NameButton key={ownerIndex} onClick={() => handleOwnerSelect(owner.id, owner.name)}>
                  <span className="user-name">{owner.name}</span>
                </NameButton>
              ))
            ) : (
              <p>회원과 수강권 선택 시 자동으로 입력됩니다.</p>
            )}
          </div>

          <div className="second-column">
            <SC.Label>
              일자 선택 <span>*</span>
            </SC.Label>
            <SC.InputField
              maxLength={10}
              name="date"
              placeholder="0000.00.00"
              type="date"
              onChange={e => {
                handleInputChange(e);
              }}
            />
            <SC.Label>
              시간 선택 <span>*</span>
            </SC.Label>
            <div className="time-inputs">
              <SC.InputField
                maxLength={5}
                name="startTime"
                placeholder="00:00"
                type="time"
                onChange={e => {
                  handleInputChange(e);
                }}
              />
              <SC.InputField
                maxLength={5}
                name="endTime"
                placeholder="00:00"
                type="time"
                onChange={e => {
                  handleInputChange(e);
                }}
              />
            </div>
            <SC.Label>일정 메모</SC.Label>
            <SC.InputField
              maxLength={500}
              name="memo"
              placeholder="내용을 입력해주세요. (500자 이내)"
              type="text"
              onChange={e => {
                handleInputChange(e);
              }}
            />
          </div>
        </S.wrap>
        <S.BtnWrap>
          <Button
            size={'full'}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleSubmit(e);
            }}
            disabled={!isValid()}
          >
            완료
          </Button>
        </S.BtnWrap>
      </S.Container>
    </>
  );
};

const NameButton = styled.button`
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.gray[900]};
  border: 1px solid ${({ theme }) => theme.colors.gray[500]};
  border-radius: 8px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  .user-name {
    color: ${({ theme }) => theme.colors.gray[500]};
  }

  .close-button {
    color: ${({ theme }) => theme.colors.gray[500]};
    margin-left: 10px;
    cursor: pointer;
    flex-shrink: 0;
  }
`;
const SelectButton = styled.button`
  font-size: 12px;
  padding: 5px 10px;
  background-color: ${theme.colors.White}; // 배경색을 흰색으로 설정
  color: ${theme.colors.pri[500]}; // 글씨색을 pri 색깔로 설정
  border: 1px solid ${theme.colors.pri[500]}; // 테두리색을 pri 색깔로 설정
  border-radius: 8px; // 둥근 테두리 적용
  transition: background-color 0.2s ease-in-out;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.pri[900]}; // hover 시 색상을 더 자연스럽게 바꿉니다.
    color: ${theme.colors.pri[400]};
  }

  &:disabled {
    background-color: ${theme.colors.gray[800]};
    cursor: not-allowed;
    color: ${theme.colors.gray[500]};
    border: 1px solid ${theme.colors.gray[500]};
  }
`;

const S = {
  Container: styled.div`
    width: 780px;
    h2 {
      text-align: center;
      font-weight: 600;
      font-size: ${({ theme: { font } }) => font['main']};
    }
    p {
      margin-bottom: 62px;
      text-align: center;
    }
  `,
  wrap: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    span {
      color: ${({ theme: { colors } }) => colors['Pri-400']};
    }

    .first-column {
      width: 50%;
      margin-right: 40px;
      input {
        margin-bottom: 26px;
      }

      .button-wrap {
        margin-bottom: 30px;

        button[type='button'] {
          width: 70px;
          height: 36px;
          border: 1px solid #cfcfcf;
          border-radius: 4px;
          margin-right: 6px;

          &.on {
            background-color: blue;
          }
        }
      }
    }
    .time-inputs {
      display: flex;
      justify-content: space-between;
      align-items: center; // 인풋 필드들을 중앙 정렬
    }

    .time-inputs > input {
      width: 50%; // 각 인풋 필드의 너비 설정
    }

    .second-column {
      width: 50%;

      select {
        margin-bottom: 26px;
      }
    }
  `,

  BtnWrap: styled.div`
    display: flex;

    & > button:nth-of-type(1) {
      margin-right: 40px;
    }
  `,
};

export default CreateSchedule;
